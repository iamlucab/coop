import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    referral_code: ''
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.password_confirmation) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.password_confirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await register(formData);
      Alert.alert(
        'Registration Successful',
        'Your account has been created. Please login.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error.message || 'Please check your information and try again'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Amigos 98 Community today!</Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
            left={<TextInput.Icon icon="phone" />}
          />

          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
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

          <TextInput
            label="Confirm Password"
            value={formData.password_confirmation}
            onChangeText={(value) => handleInputChange('password_confirmation', value)}
            secureTextEntry={secureConfirmTextEntry}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
            right={
              <TextInput.Icon
                icon={secureConfirmTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}
              />
            }
          />

          <TextInput
            label="Referral Code (Optional)"
            value={formData.referral_code}
            onChangeText={(value) => handleInputChange('referral_code', value)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account-multiple" />}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.registerButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              "Register"
            )}
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#007bff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#666',
    marginRight: 5,
  },
  loginText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;