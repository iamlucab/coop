import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const [hasBiometricCredentials, setHasBiometricCredentials] = useState(false);
  
  const { login, error } = useAuth();

  useEffect(() => {
    checkBiometricSupport();
    checkStoredCredentials();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      
      if (available) {
        setBiometricSupported(true);
        setBiometricType(biometryType);
      }
    } catch (error) {
      console.log('Biometric check error:', error);
    }
  };

  const checkStoredCredentials = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('biometric_credentials');
      setHasBiometricCredentials(!!storedCredentials);
    } catch (error) {
      console.log('Error checking stored credentials:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email/mobile and password');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await login(email, password);
      
      if (result.success) {
        // Ask user if they want to enable biometric login
        if (biometricSupported && !hasBiometricCredentials) {
          Alert.alert(
            'Enable Biometric Login',
            `Would you like to enable ${biometricType} login for faster access?`,
            [
              { text: 'Not Now', style: 'cancel' },
              { text: 'Enable', onPress: () => setupBiometricLogin(email, result.token) }
            ]
          );
        }
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.message || 'Please check your credentials and try again'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const setupBiometricLogin = async (userEmail, authToken) => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      
      // Create biometric signature
      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: 'Setup biometric login',
        payload: userEmail
      });

      if (success) {
        // Store credentials securely
        const credentials = {
          email: userEmail,
          token: authToken,
          signature: signature,
          timestamp: Date.now()
        };
        
        await AsyncStorage.setItem('biometric_credentials', JSON.stringify(credentials));
        setHasBiometricCredentials(true);
        
        Alert.alert('Success', 'Biometric login has been enabled!');
      }
    } catch (error) {
      console.log('Biometric setup error:', error);
      Alert.alert('Setup Failed', 'Could not setup biometric login');
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      
      // Get stored credentials
      const storedCredentials = await AsyncStorage.getItem('biometric_credentials');
      if (!storedCredentials) {
        Alert.alert('Error', 'No biometric credentials found');
        return;
      }

      const credentials = JSON.parse(storedCredentials);
      
      // Check if credentials are not too old (30 days)
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (credentials.timestamp < thirtyDaysAgo) {
        Alert.alert(
          'Credentials Expired',
          'Please login with your password to refresh biometric access',
          [
            { text: 'OK', onPress: () => clearBiometricCredentials() }
          ]
        );
        return;
      }

      // Prompt for biometric authentication
      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: `Use ${biometricType} to login`,
        payload: credentials.email
      });

      if (success) {
        setIsSubmitting(true);
        
        // Attempt login with stored token or refresh
        try {
          const result = await login(credentials.email, null, credentials.token);
          if (result.success) {
            // Update stored credentials with new token if provided
            if (result.token && result.token !== credentials.token) {
              credentials.token = result.token;
              credentials.timestamp = Date.now();
              await AsyncStorage.setItem('biometric_credentials', JSON.stringify(credentials));
            }
          }
        } catch (error) {
          // If token is invalid, clear biometric credentials
          if (error.message.includes('token') || error.message.includes('expired')) {
            Alert.alert(
              'Session Expired',
              'Please login with your password to refresh biometric access',
              [
                { text: 'OK', onPress: () => clearBiometricCredentials() }
              ]
            );
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      Alert.alert('Biometric Login Failed', error.message || 'Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearBiometricCredentials = async () => {
    try {
      await AsyncStorage.removeItem('biometric_credentials');
      setHasBiometricCredentials(false);
    } catch (error) {
      console.log('Error clearing biometric credentials:', error);
    }
  };

  const getBiometricIcon = () => {
    switch (biometricType) {
      case 'TouchID':
        return 'fingerprint';
      case 'FaceID':
        return 'face-recognition';
      case 'Biometrics':
        return 'fingerprint';
      default:
        return 'fingerprint';
    }
  };

  const getBiometricText = () => {
    switch (biometricType) {
      case 'TouchID':
        return 'Use Touch ID';
      case 'FaceID':
        return 'Use Face ID';
      case 'Biometrics':
        return 'Use Biometric';
      default:
        return 'Use Biometric';
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Amigos 98 Community</Text>
          <Text style={styles.tagline}>Shop to Save, Shop to Earn!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email or Mobile Number"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
            placeholder="Enter email or mobile number"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              "Login"
            )}
          </Button>

          {/* Biometric Login Button */}
          {biometricSupported && hasBiometricCredentials && (
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
              disabled={isSubmitting}
            >
              <TextInput.Icon 
                icon={getBiometricIcon()} 
                size={32} 
                iconColor="#007bff"
              />
              <Text style={styles.biometricText}>{getBiometricText()}</Text>
            </TouchableOpacity>
          )}

          {/* Biometric Setup Button (if supported but not set up) */}
          {biometricSupported && !hasBiometricCredentials && email && password && (
            <TouchableOpacity
              style={styles.biometricSetupButton}
              onPress={() => Alert.alert(
                'Setup Biometric Login',
                'Login first, then you can enable biometric authentication for future logins.'
              )}
            >
              <TextInput.Icon 
                icon={getBiometricIcon()} 
                size={24} 
                iconColor="#666"
              />
              <Text style={styles.biometricSetupText}>
                Setup {biometricType} Login
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Register Now</Text>
          </TouchableOpacity>
        </View>

        {/* Clear Biometric Data Button (for testing/debugging) */}
        {hasBiometricCredentials && __DEV__ && (
          <TouchableOpacity
            style={styles.clearBiometricButton}
            onPress={() => {
              Alert.alert(
                'Clear Biometric Data',
                'This will remove saved biometric login data. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', onPress: clearBiometricCredentials, style: 'destructive' }
                ]
              );
            }}
          >
            <Text style={styles.clearBiometricText}>Clear Biometric Data</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007bff',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#007bff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  biometricText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  biometricSetupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  biometricSetupText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    marginRight: 5,
  },
  registerText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  clearBiometricButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  clearBiometricText: {
    color: '#dc3545',
    fontSize: 12,
  },
});

export default LoginScreen;