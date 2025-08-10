import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList
} from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator, Badge } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    walletBalance: 0,
    pendingOrders: 0,
    activeLoans: 0,
    recentProducts: [],
    notifications: []
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'Member'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Quick Stats Cards */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('Wallet')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#e6f7ff' }]}>
            <Text style={styles.iconText}>₱</Text>
          </View>
          <Text style={styles.statValue}>₱{dashboardData.walletBalance.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Wallet Balance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#fff7e6' }]}>
            <Text style={styles.iconText}>📦</Text>
          </View>
          <Text style={styles.statValue}>{dashboardData.pendingOrders}</Text>
          <Text style={styles.statLabel}>Pending Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('LoanHistory')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#f6ffed' }]}>
            <Text style={styles.iconText}>💰</Text>
          </View>
          <Text style={styles.statValue}>{dashboardData.activeLoans}</Text>
          <Text style={styles.statLabel}>Active Loans</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Shop')}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🛒</Text>
            </View>
            <Text style={styles.actionText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('RequestLoan')}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>💸</Text>
            </View>
            <Text style={styles.actionText}>Request Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Wallet')}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>👛</Text>
            </View>
            <Text style={styles.actionText}>My Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>👤</Text>
            </View>
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Products */}
      {dashboardData.recentProducts.length > 0 && (
        <View style={styles.recentProductsContainer}>
          <Text style={styles.sectionTitle}>Recent Products</Text>
          <FlatList
            horizontal
            data={dashboardData.recentProducts}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id, title: item.name })}
              >
                <Card style={styles.productCard}>
                  <Card.Cover source={{ uri: item.image_url }} style={styles.productImage} />
                  <Card.Content>
                    <Title style={styles.productTitle}>{item.name}</Title>
                    <Paragraph style={styles.productPrice}>₱{item.price.toFixed(2)}</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Notifications */}
      {dashboardData.notifications.length > 0 && (
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {dashboardData.notifications.map((notification, index) => (
            <Card key={index} style={styles.notificationCard}>
              <Card.Content>
                <Title style={styles.notificationTitle}>{notification.title}</Title>
                <Paragraph>{notification.message}</Paragraph>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        icon="logout"
      >
        Logout
      </Button>
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
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007bff',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionsContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    marginTop: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  recentProductsContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    marginTop: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  productCard: {
    width: 150,
    marginRight: 15,
    elevation: 3,
  },
  productImage: {
    height: 100,
  },
  productTitle: {
    fontSize: 14,
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  notificationsContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    marginTop: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  notificationCard: {
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  logoutButton: {
    margin: 15,
    marginTop: 5,
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
});

export default DashboardScreen;