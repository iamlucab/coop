import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import { api } from '../api/api';

class NotificationService {
  constructor() {
    this.isInitialized = false;
    this.fcmToken = null;
  }

  /**
   * Initialize Firebase messaging
   */
  async initialize() {
    try {
      // Request permission for notifications
      const hasPermission = await this.requestPermission();
      
      if (!hasPermission) {
        console.log('Notification permission denied');
        return false;
      }

      // Get FCM token
      await this.getFCMToken();

      // Set up message handlers
      this.setupMessageHandlers();

      // Register token with backend
      await this.registerTokenWithBackend();

      this.isInitialized = true;
      console.log('Notification service initialized successfully');
      return true;

    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      return false;
    }
  }

  /**
   * Request notification permission
   */
  async requestPermission() {
    try {
      if (Platform.OS === 'android') {
        // For Android 13+ (API level 33+), request POST_NOTIFICATIONS permission
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'Amigos 98 Community needs notification permission to send you important updates',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            return false;
          }
        }
      }

      // Request Firebase messaging permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabled;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  /**
   * Get FCM token
   */
  async getFCMToken() {
    try {
      const token = await messaging().getToken();
      this.fcmToken = token;
      
      // Store token locally
      await AsyncStorage.setItem('fcm_token', token);
      
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Setup message handlers
   */
  setupMessageHandlers() {
    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      this.handleBackgroundMessage(remoteMessage);
    });

    // Handle foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      this.handleForegroundMessage(remoteMessage);
    });

    // Handle notification opened app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      this.handleNotificationOpen(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
          this.handleNotificationOpen(remoteMessage);
        }
      });

    // Handle token refresh
    messaging().onTokenRefresh(token => {
      console.log('FCM token refreshed:', token);
      this.fcmToken = token;
      AsyncStorage.setItem('fcm_token', token);
      this.registerTokenWithBackend();
    });
  }

  /**
   * Handle foreground messages
   */
  handleForegroundMessage(remoteMessage) {
    const { notification, data } = remoteMessage;
    
    if (notification) {
      // Show alert for foreground notifications
      Alert.alert(
        notification.title || 'Notification',
        notification.body || 'You have a new message',
        [
          {
            text: 'Dismiss',
            style: 'cancel',
          },
          {
            text: 'View',
            onPress: () => this.handleNotificationAction(data),
          },
        ]
      );
    }
  }

  /**
   * Handle background messages
   */
  handleBackgroundMessage(remoteMessage) {
    console.log('Background message data:', remoteMessage.data);
    // Handle background message logic here
  }

  /**
   * Handle notification open
   */
  handleNotificationOpen(remoteMessage) {
    const { data } = remoteMessage;
    this.handleNotificationAction(data);
  }

  /**
   * Handle notification action based on data
   */
  handleNotificationAction(data) {
    if (!data) return;

    // Handle different notification types
    switch (data.type) {
      case 'order_update':
        // Navigate to order details
        console.log('Navigate to order:', data.order_id);
        break;
      case 'loan_update':
        // Navigate to loan details
        console.log('Navigate to loan:', data.loan_id);
        break;
      case 'wallet_update':
        // Navigate to wallet
        console.log('Navigate to wallet');
        break;
      case 'promotion':
        // Navigate to shop or specific product
        console.log('Navigate to promotion:', data.promotion_id);
        break;
      default:
        console.log('Unknown notification type:', data.type);
    }
  }

  /**
   * Register token with backend
   */
  async registerTokenWithBackend() {
    if (!this.fcmToken) {
      console.log('No FCM token available');
      return false;
    }

    try {
      const deviceInfo = await this.getDeviceInfo();
      
      const response = await api.post('/notifications/register-token', {
        device_token: this.fcmToken,
        device_type: 'mobile',
        platform: Platform.OS,
        device_id: deviceInfo.deviceId,
        app_version: deviceInfo.appVersion,
      });

      if (response.data.success) {
        console.log('Device token registered successfully');
        await AsyncStorage.setItem('token_registered', 'true');
        return true;
      } else {
        console.error('Failed to register device token:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error registering device token:', error);
      return false;
    }
  }

  /**
   * Unregister token from backend
   */
  async unregisterTokenFromBackend() {
    if (!this.fcmToken) {
      return false;
    }

    try {
      const response = await api.post('/notifications/unregister-token', {
        device_token: this.fcmToken,
      });

      if (response.data.success) {
        console.log('Device token unregistered successfully');
        await AsyncStorage.removeItem('token_registered');
        await AsyncStorage.removeItem('fcm_token');
        return true;
      } else {
        console.error('Failed to unregister device token:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error unregistering device token:', error);
      return false;
    }
  }

  /**
   * Get device information
   */
  async getDeviceInfo() {
    const { DeviceInfo } = require('react-native');
    
    try {
      return {
        deviceId: await DeviceInfo.getUniqueId(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
      };
    } catch (error) {
      console.error('Error getting device info:', error);
      return {
        deviceId: 'unknown',
        appVersion: '1.0.0',
        buildNumber: '1',
        systemName: Platform.OS,
        systemVersion: Platform.Version.toString(),
      };
    }
  }

  /**
   * Send test notification
   */
  async sendTestNotification() {
    if (!this.fcmToken) {
      Alert.alert('Error', 'No FCM token available');
      return false;
    }

    try {
      const response = await api.post('/notifications/test', {
        device_token: this.fcmToken,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Test notification sent successfully');
        return true;
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send test notification');
        return false;
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      Alert.alert('Error', 'Failed to send test notification');
      return false;
    }
  }

  /**
   * Get notification settings
   */
  async getNotificationSettings() {
    try {
      const settings = await messaging().getNotificationSettings();
      return {
        authorizationStatus: settings.authorizationStatus,
        soundSetting: settings.soundSetting,
        badgeSetting: settings.badgeSetting,
        alertSetting: settings.alertSetting,
        notificationCenterSetting: settings.notificationCenterSetting,
        lockScreenSetting: settings.lockScreenSetting,
        carPlaySetting: settings.carPlaySetting,
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return null;
    }
  }

  /**
   * Check if notifications are enabled
   */
  async areNotificationsEnabled() {
    try {
      const settings = await this.getNotificationSettings();
      return settings && settings.authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED;
    } catch (error) {
      console.error('Error checking notification status:', error);
      return false;
    }
  }

  /**
   * Get stored FCM token
   */
  async getStoredToken() {
    try {
      return await AsyncStorage.getItem('fcm_token');
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  /**
   * Clear notification data
   */
  async clearNotificationData() {
    try {
      await AsyncStorage.multiRemove(['fcm_token', 'token_registered']);
      this.fcmToken = null;
      this.isInitialized = false;
      console.log('Notification data cleared');
    } catch (error) {
      console.error('Error clearing notification data:', error);
    }
  }
}

// Export singleton instance
export default new NotificationService();