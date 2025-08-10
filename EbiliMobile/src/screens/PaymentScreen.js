import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Button, Card, Title, Paragraph, TextInput, Divider } from 'react-native-paper';
import CameraComponent from '../components/CameraComponent';
import api from '../api/api';

const PaymentScreen = ({ route, navigation }) => {
  const { paymentId, loanId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [paymentProofImage, setPaymentProofImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/loan-payments/${paymentId}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payment data:', error);
      Alert.alert('Error', 'Failed to load payment information');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paymentId) {
      Alert.alert('Error', 'Payment ID is required');
      navigation.goBack();
      return;
    }
    fetchPaymentData();
  }, [paymentId]);

  const handleCameraCapture = (imageUri) => {
    setPaymentProofImage(imageUri);
    setShowCamera(false);
  };

  const validateForm = () => {
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return false;
    }

    if (!referenceNumber.trim()) {
      Alert.alert('Error', 'Please enter the reference number');
      return false;
    }

    if (!paymentProofImage) {
      Alert.alert('Error', 'Please upload a payment proof image');
      return false;
    }

    return true;
  };

  const handleSubmitPayment = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // Create form data for image upload
      const formData = new FormData();
      formData.append('payment_id', paymentId);
      formData.append('payment_method', paymentMethod);
      formData.append('reference_number', referenceNumber);
      formData.append('payment_proof', {
        uri: paymentProofImage,
        type: 'image/jpeg',
        name: 'payment_proof.jpg'
      });

      const response = await api.post('/loan-payments/submit-payment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert(
        'Payment Submitted',
        'Your payment has been submitted for verification. You will be notified once it is processed.',
        [{ text: 'OK', onPress: () => navigation.navigate('LoanDetail', { loanId }) }]
      );
    } catch (error) {
      console.error('Error submitting payment:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit payment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading payment information...</Text>
      </View>
    );
  }

  if (showCamera) {
    return (
      <CameraComponent
        onPictureTaken={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Payment Details Card */}
      <Card style={styles.detailsCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Payment Details</Title>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment ID:</Text>
            <Text style={styles.detailValue}>{paymentData?.id || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Due Date:</Text>
            <Text style={styles.detailValue}>{paymentData?.due_date || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Due:</Text>
            <Text style={styles.detailValue}>₱{parseFloat(paymentData?.amount || 0).toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={[
              styles.detailValue,
              styles.statusText,
              { color: paymentData?.status === 'paid' ? '#4caf50' : '#f44336' }
            ]}>
              {paymentData?.status_formatted || 'Pending'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Payment Instructions */}
      <Card style={styles.instructionsCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Payment Instructions</Title>
          <Paragraph style={styles.instructionText}>
            Please make your payment using one of the following methods and upload a proof of payment.
          </Paragraph>
          
          <Divider style={styles.divider} />
          
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                paymentMethod === 'gcash' && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod('gcash')}
            >
              <Text style={styles.paymentMethodName}>GCash</Text>
              <Text style={styles.paymentMethodDetails}>09123456789</Text>
              <Text style={styles.paymentMethodDetails}>Juan Dela Cruz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodOption,
                paymentMethod === 'bank' && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod('bank')}
            >
              <Text style={styles.paymentMethodName}>Bank Transfer</Text>
              <Text style={styles.paymentMethodDetails}>BDO: 1234-5678-9012</Text>
              <Text style={styles.paymentMethodDetails}>Juan Dela Cruz</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Payment Form */}
      <Card style={styles.formCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Submit Payment</Title>
          
          <TextInput
            label="Reference Number"
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            mode="outlined"
            style={styles.input}
            placeholder="Enter transaction reference number"
          />
          
          <Text style={styles.sectionLabel}>Payment Proof</Text>
          
          {paymentProofImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: paymentProofImage }}
                style={styles.imagePreview}
                resizeMode="contain"
              />
              <Button
                mode="outlined"
                onPress={() => setShowCamera(true)}
                style={styles.retakeButton}
                icon="camera-retake"
              >
                Retake Photo
              </Button>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setShowCamera(true)}
            >
              <Text style={styles.uploadButtonText}>Take Photo of Payment Proof</Text>
              <Text style={styles.uploadIcon}>📷</Text>
            </TouchableOpacity>
          )}
          
          <Button
            mode="contained"
            onPress={handleSubmitPayment}
            style={styles.submitButton}
            loading={submitting}
            disabled={submitting}
          >
            Submit Payment
          </Button>
        </Card.Content>
      </Card>
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
  detailsCard: {
    margin: 15,
    elevation: 2,
  },
  instructionsCard: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  formCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusText: {
    textTransform: 'uppercase',
  },
  divider: {
    marginVertical: 15,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethodOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  selectedPaymentMethod: {
    borderColor: '#007bff',
    backgroundColor: '#e6f2ff',
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentMethodDetails: {
    fontSize: 12,
    color: '#666',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
  },
  uploadIcon: {
    fontSize: 30,
  },
  imagePreviewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  retakeButton: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
  },
});

export default PaymentScreen;