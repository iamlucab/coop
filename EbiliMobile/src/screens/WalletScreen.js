import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator, Divider, Modal, Portal, TextInput } from 'react-native-paper';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const WalletScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: []
  });
  const [cashInModalVisible, setCashInModalVisible] = useState(false);
  const [cashInAmount, setCashInAmount] = useState('');
  const [cashInReference, setCashInReference] = useState('');
  const [submittingCashIn, setSubmittingCashIn] = useState(false);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/wallet');
      setWalletData(response.data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      Alert.alert('Error', 'Failed to load wallet data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWalletData();
  };

  const handleCashIn = async () => {
    if (!cashInAmount || parseFloat(cashInAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!cashInReference) {
      Alert.alert('Error', 'Please enter a reference number');
      return;
    }

    try {
      setSubmittingCashIn(true);
      const response = await api.post('/wallet/cash-in', {
        amount: parseFloat(cashInAmount),
        reference: cashInReference
      });
      
      Alert.alert(
        'Cash In Request Submitted',
        'Your cash in request has been submitted for approval.',
        [{ text: 'OK', onPress: () => {
          setCashInModalVisible(false);
          setCashInAmount('');
          setCashInReference('');
          fetchWalletData();
        }}]
      );
    } catch (error) {
      console.error('Error submitting cash in:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit cash in request');
    } finally {
      setSubmittingCashIn(false);
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'cash_in':
        return '#4caf50'; // Green
      case 'cash_out':
        return '#f44336'; // Red
      case 'purchase':
        return '#ff9800'; // Orange
      case 'refund':
        return '#2196f3'; // Blue
      case 'bonus':
        return '#9c27b0'; // Purple
      default:
        return '#757575'; // Grey
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'cash_in':
        return '💰';
      case 'cash_out':
        return '💸';
      case 'purchase':
        return '🛒';
      case 'refund':
        return '↩️';
      case 'bonus':
        return '🎁';
      default:
        return '💱';
    }
  };

  const formatTransactionType = (type) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const renderTransactionItem = ({ item }) => (
    <Card style={styles.transactionCard}>
      <Card.Content>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionTypeContainer}>
            <Text style={styles.transactionIcon}>{getTransactionIcon(item.type)}</Text>
            <View>
              <Text style={styles.transactionType}>{formatTransactionType(item.type)}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          </View>
          <Text 
            style={[
              styles.transactionAmount, 
              { color: getTransactionTypeColor(item.type) }
            ]}
          >
            {item.type === 'cash_out' || item.type === 'purchase' ? '-' : '+'}₱{parseFloat(item.amount).toFixed(2)}
          </Text>
        </View>
        {item.description && (
          <Text style={styles.transactionDescription}>{item.description}</Text>
        )}
        {item.reference && (
          <Text style={styles.transactionReference}>Ref: {item.reference}</Text>
        )}
      </Card.Content>
    </Card>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading wallet data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Wallet Balance Card */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <Title style={styles.balanceTitle}>Wallet Balance</Title>
          <Text style={styles.balanceAmount}>₱{parseFloat(walletData.balance).toFixed(2)}</Text>
          <View style={styles.actionButtons}>
            <Button 
              mode="contained" 
              onPress={() => setCashInModalVisible(true)}
              style={[styles.actionButton, { backgroundColor: '#4caf50' }]}
              icon="cash-plus"
            >
              Cash In
            </Button>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('CashOut')}
              style={[styles.actionButton, { backgroundColor: '#f44336' }]}
              icon="cash-minus"
            >
              Cash Out
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Transactions List */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={walletData.transactions}
          keyExtractor={(item, index) => `transaction-${index}`}
          renderItem={renderTransactionItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
        />
      </View>

      {/* Cash In Modal */}
      <Portal>
        <Modal
          visible={cashInModalVisible}
          onDismiss={() => setCashInModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Cash In</Title>
          <Paragraph style={styles.modalDescription}>
            Please enter the amount you want to cash in and the reference number from your payment.
          </Paragraph>
          
          <TextInput
            label="Amount (₱)"
            value={cashInAmount}
            onChangeText={setCashInAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.modalInput}
          />
          
          <TextInput
            label="Reference Number"
            value={cashInReference}
            onChangeText={setCashInReference}
            mode="outlined"
            style={styles.modalInput}
          />
          
          <Paragraph style={styles.paymentInstructions}>
            Please send your payment to GCash: 09123456789 or Bank: 1234-5678-9012
          </Paragraph>
          
          <View style={styles.modalButtons}>
            <Button 
              mode="outlined" 
              onPress={() => setCashInModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button 
              mode="contained" 
              onPress={handleCashIn}
              style={styles.modalButton}
              loading={submittingCashIn}
              disabled={submittingCashIn}
            >
              Submit
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
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
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  balanceCard: {
    margin: 15,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  transactionsContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  transactionCard: {
    marginBottom: 10,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    marginTop: 5,
    color: '#666',
  },
  transactionReference: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 15,
  },
  paymentInstructions: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default WalletScreen;