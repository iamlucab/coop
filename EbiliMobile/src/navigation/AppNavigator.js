import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Import screens
// Auth screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

// Main app screens
import DashboardScreen from '../screens/DashboardScreen';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WalletScreen from '../screens/WalletScreen';
import LoanHistoryScreen from '../screens/LoanHistoryScreen';
import LoanDetailScreen from '../screens/LoanDetailScreen';
import RequestLoanScreen from '../screens/RequestLoanScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

// Auth navigator
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: 'Amigos 98 Community Login' }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ title: 'Create Account' }}
    />
    <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen} 
      options={{ title: 'Reset Password' }}
    />
  </Stack.Navigator>
);

// Main app navigator
const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ title: 'Amigos 98 Community Dashboard' }}
    />
    <Stack.Screen 
      name="Shop" 
      component={ShopScreen} 
      options={{ title: 'Shop' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen} 
      options={({ route }) => ({ title: route.params?.title || 'Product Details' })}
    />
    <Stack.Screen 
      name="Cart" 
      component={CartScreen} 
      options={{ title: 'Shopping Cart' }}
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen} 
      options={{ title: 'Checkout' }}
    />
    <Stack.Screen 
      name="OrderHistory" 
      component={OrderHistoryScreen} 
      options={{ title: 'My Orders' }}
    />
    <Stack.Screen 
      name="OrderDetail" 
      component={OrderDetailScreen} 
      options={{ title: 'Order Details' }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: 'My Profile' }}
    />
    <Stack.Screen 
      name="Wallet" 
      component={WalletScreen} 
      options={{ title: 'My Wallet' }}
    />
    <Stack.Screen 
      name="LoanHistory" 
      component={LoanHistoryScreen} 
      options={{ title: 'My Loans' }}
    />
    <Stack.Screen 
      name="LoanDetail" 
      component={LoanDetailScreen} 
      options={{ title: 'Loan Details' }}
    />
    <Stack.Screen 
      name="RequestLoan" 
      component={RequestLoanScreen} 
      options={{ title: 'Request Loan' }}
    />
    <Stack.Screen 
      name="Payment" 
      component={PaymentScreen} 
      options={{ title: 'Make Payment' }}
    />
  </Stack.Navigator>
);

// Root navigator that switches between auth and main flows
const AppNavigator = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // You could return a loading screen here
    return null;
  }

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;