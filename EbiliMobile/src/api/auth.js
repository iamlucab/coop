import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Response data or error
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data && response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Response data or error
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

/**
 * Logout user
 * @returns {Promise} - Response data or error
 */
export const logout = async () => {
  try {
    await api.post('/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

/**
 * Get current user profile
 * @returns {Promise} - Response data or error
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} - True if authenticated, false otherwise
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  } catch (error) {
    return false;
  }
};