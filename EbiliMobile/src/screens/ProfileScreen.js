import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { TextInput, Button, Divider, Avatar, List, Switch } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [secureTextEntry, setSecureTextEntry] = useState({
    current: true,
    new: true,
    confirm: true
  });
  const [saving, setSaving] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/profile');
      setProfileData(response.data);
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      setPushNotifications(response.data.push_notifications_enabled || true);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const toggleSecureEntry = (field) => {
    setSecureTextEntry({
      ...secureTextEntry,
      [field]: !secureTextEntry[field]
    });
  };

  const handleSaveProfile = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate password if changing
    if (formData.new_password) {
      if (!formData.current_password) {
        Alert.alert('Error', 'Please enter your current password');
        return;
      }
      if (formData.new_password !== formData.new_password_confirmation) {
        Alert.alert('Error', 'New passwords do not match');
        return;
      }
      if (formData.new_password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters');
        return;
      }
    }

    try {
      setSaving(true);
      const response = await api.post('/profile/update', formData);
      
      // Update user in context
      updateUser(response.data);
      
      setProfileData(response.data);
      setEditMode(false);
      
      // Clear password fields
      setFormData({
        ...formData,
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePushNotifications = async (value) => {
    setPushNotifications(value);
    try {
      await api.post('/profile/notifications', { enabled: value });
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setPushNotifications(!value); // Revert on error
      Alert.alert('Error', 'Failed to update notification settings');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{profileData?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{profileData?.email || ''}</Text>
        <Text style={styles.memberSince}>Member since: {profileData?.created_at_formatted || 'N/A'}</Text>
      </View>

      {/* Edit Profile Form */}
      {editMode ? (
        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Address"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Change Password</Text>

          <TextInput
            label="Current Password"
            value={formData.current_password}
            onChangeText={(value) => handleInputChange('current_password', value)}
            secureTextEntry={secureTextEntry.current}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureTextEntry.current ? "eye" : "eye-off"}
                onPress={() => toggleSecureEntry('current')}
              />
            }
          />

          <TextInput
            label="New Password"
            value={formData.new_password}
            onChangeText={(value) => handleInputChange('new_password', value)}
            secureTextEntry={secureTextEntry.new}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureTextEntry.new ? "eye" : "eye-off"}
                onPress={() => toggleSecureEntry('new')}
              />
            }
          />

          <TextInput
            label="Confirm New Password"
            value={formData.new_password_confirmation}
            onChangeText={(value) => handleInputChange('new_password_confirmation', value)}
            secureTextEntry={secureTextEntry.confirm}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureTextEntry.confirm ? "eye" : "eye-off"}
                onPress={() => toggleSecureEntry('confirm')}
              />
            }
          />

          <View style={styles.formButtons}>
            <Button
              mode="outlined"
              onPress={() => setEditMode(false)}
              style={[styles.formButton, styles.cancelButton]}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSaveProfile}
              style={styles.formButton}
              loading={saving}
              disabled={saving}
            >
              Save
            </Button>
          </View>
        </View>
      ) : (
        <>
          {/* Profile Info */}
          <View style={styles.infoContainer}>
            <List.Section>
              <List.Item
                title="Full Name"
                description={profileData?.name || 'N/A'}
                left={props => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                title="Email"
                description={profileData?.email || 'N/A'}
                left={props => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                title="Phone"
                description={profileData?.phone || 'N/A'}
                left={props => <List.Icon {...props} icon="phone" />}
              />
              <List.Item
                title="Address"
                description={profileData?.address || 'N/A'}
                left={props => <List.Icon {...props} icon="map-marker" />}
              />
              <List.Item
                title="Referral Code"
                description={profileData?.referral_code || 'N/A'}
                left={props => <List.Icon {...props} icon="account-multiple" />}
              />
            </List.Section>

            <Button
              mode="contained"
              onPress={() => setEditMode(true)}
              style={styles.editButton}
              icon="account-edit"
            >
              Edit Profile
            </Button>
          </View>

          {/* Settings */}
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <List.Item
              title="Push Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={pushNotifications}
                  onValueChange={handleTogglePushNotifications}
                  color="#007bff"
                />
              )}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-account" />}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              left={props => <List.Icon {...props} icon="file-document" />}
              onPress={() => navigation.navigate('TermsOfService')}
            />
            <Divider />
            <List.Item
              title="About"
              left={props => <List.Icon {...props} icon="information" />}
              onPress={() => navigation.navigate('About')}
            />
            <Divider />
            <List.Item
              title="Logout"
              titleStyle={{ color: '#f44336' }}
              left={props => <List.Icon {...props} icon="logout" color="#f44336" />}
              onPress={handleLogout}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007bff',
  },
  avatar: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 12,
    color: '#e0e0e0',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    padding: 10,
    elevation: 2,
  },
  editButton: {
    margin: 15,
    backgroundColor: '#007bff',
  },
  settingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    marginTop: 0,
    padding: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
    marginBottom: 10,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    elevation: 2,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  divider: {
    marginVertical: 15,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    borderColor: '#f44336',
  },
});

export default ProfileScreen;