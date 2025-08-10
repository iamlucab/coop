import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import NotificationService from './utils/NotificationService';

const App = () => {
  // Initialize notification service
  useEffect(() => {
    const initNotifications = async () => {
      try {
        const initialized = await NotificationService.initialize();
        if (initialized) {
          console.log('Push notifications initialized successfully');
        } else {
          console.log('Push notifications initialization failed');
        }
      } catch (error) {
        console.error('Error initializing push notifications:', error);
      }
    };
    
    initNotifications();
    
    // Cleanup notification listeners when component unmounts
    return () => {
      // Clear notification data on app unmount if needed
      // NotificationService.clearNotificationData();
    };
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;