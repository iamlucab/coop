import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator, Divider, RadioButton } from 'react-native-paper';
import api from '../api/api';

const RequestLoanScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [eligibility, setEligibility] = useState({
    eligible: false,
    message: '',
    maxAmount: 0
  });

  const fetchLoanTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/loans/types');
      setLoanTypes(response.data);
      if (response.data.length > 0) {
        setSelectedLoanType(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching loan types:', error);
      Alert.alert('Error', 'Failed to load loan types');
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      setLoading(true);
      const response = await api.get('/loans/eligibility');
      setEligibility(response.data);
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setEligibility({
        eligible: false,
        message: 'Failed to check eligibility. Please try again.',
        maxAmount: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanTypes();
    checkEligibility();
  }, []);

  const validateForm = () => {
    if (!selectedLoanType) {
      Alert.alert('Error', 'Please select a loan type');
      return false;
    }

    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid loan amount');
      return false;
    }

    if (parseFloat(loanAmount) > eligibility.maxAmount) {
      Alert.alert('Error', `Maximum loan amount is ₱${eligibility.maxAmount.toFixed(2)}`);
      return false;
    }

    if (!purpose.trim()) {
      Alert.alert('Error', 'Please enter the purpose of the loan');
      return false;
    }

    if (!termsAccepted) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const response = await api.post('/loans/request', {
        loan_type_id: selectedLoanType,
        amount: parseFloat(loanAmount),
        purpose: purpose,
        terms_accepted: termsAccepted
      });

      Alert.alert(
        'Loan Request Submitted',
        'Your loan request has been submitted for approval. You will be notified once it is processed.',
        [{ text: 'OK', onPress: () => navigation.navigate('LoanHistory') }]
      );
    } catch (error) {
      console.error('Error submitting loan request:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit loan request');
    } finally {
      setSubmitting(false);
    }
  };

  const getSelectedLoanTypeDetails = () => {
    return loanTypes.find(type => type.id === selectedLoanType) || {};
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading loan information...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Eligibility Card */}
        <Card style={[
          styles.eligibilityCard,
          { backgroundColor: eligibility.eligible ? '#e8f5e9' : '#ffebee' }
        ]}>
          <Card.Content>
            <Title style={styles.eligibilityTitle}>
              {eligibility.eligible ? 'You are eligible for a loan!' : 'Loan Eligibility Status'}
            </Title>
            <Paragraph style={styles.eligibilityMessage}>
              {eligibility.message}
            </Paragraph>
            {eligibility.eligible && (
              <Paragraph style={styles.maxAmount}>
                Maximum amount: ₱{eligibility.maxAmount.toFixed(2)}
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {eligibility.eligible ? (
          <View style={styles.formContainer}>
            {/* Loan Types */}
            <Text style={styles.sectionTitle}>Select Loan Type</Text>
            <RadioButton.Group
              onValueChange={value => setSelectedLoanType(value)}
              value={selectedLoanType}
            >
              {loanTypes.map(type => (
                <Card key={type.id} style={styles.loanTypeCard}>
                  <Card.Content>
                    <View style={styles.loanTypeHeader}>
                      <RadioButton value={type.id} />
                      <Title style={styles.loanTypeName}>{type.name}</Title>
                    </View>
                    <Paragraph style={styles.loanTypeDescription}>
                      {type.description}
                    </Paragraph>
                    <View style={styles.loanTypeDetails}>
                      <Text style={styles.loanTypeDetail}>
                        Interest Rate: {type.interest_rate}%
                      </Text>
                      <Text style={styles.loanTypeDetail}>
                        Term: {type.term_months} months
                      </Text>
                      <Text style={styles.loanTypeDetail}>
                        Processing Fee: ₱{parseFloat(type.processing_fee).toFixed(2)}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </RadioButton.Group>

            {/* Loan Amount */}
            <Text style={styles.sectionTitle}>Loan Details</Text>
            <TextInput
              label="Loan Amount (₱)"
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Purpose of Loan"
              value={purpose}
              onChangeText={setPurpose}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            {/* Loan Summary */}
            {selectedLoanType && loanAmount && parseFloat(loanAmount) > 0 && (
              <Card style={styles.summaryCard}>
                <Card.Content>
                  <Title style={styles.summaryTitle}>Loan Summary</Title>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Loan Type:</Text>
                    <Text style={styles.summaryValue}>{getSelectedLoanTypeDetails().name}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Principal Amount:</Text>
                    <Text style={styles.summaryValue}>₱{parseFloat(loanAmount).toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Interest Rate:</Text>
                    <Text style={styles.summaryValue}>{getSelectedLoanTypeDetails().interest_rate}%</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Term:</Text>
                    <Text style={styles.summaryValue}>{getSelectedLoanTypeDetails().term_months} months</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Processing Fee:</Text>
                    <Text style={styles.summaryValue}>₱{parseFloat(getSelectedLoanTypeDetails().processing_fee).toFixed(2)}</Text>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Monthly Payment:</Text>
                    <Text style={styles.summaryValue}>₱{(
                      parseFloat(loanAmount) * 
                      (1 + getSelectedLoanTypeDetails().interest_rate / 100) / 
                      getSelectedLoanTypeDetails().term_months
                    ).toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Repayment:</Text>
                    <Text style={styles.summaryValue}>₱{(
                      parseFloat(loanAmount) * 
                      (1 + getSelectedLoanTypeDetails().interest_rate / 100)
                    ).toFixed(2)}</Text>
                  </View>
                </Card.Content>
              </Card>
            )}

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.termsCheckbox}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                <View style={[
                  styles.checkbox,
                  termsAccepted && styles.checkboxChecked
                ]}>
                  {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the terms and conditions of the loan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LoanTerms')}>
                <Text style={styles.viewTermsText}>View Terms and Conditions</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={submitting}
              disabled={submitting || !eligibility.eligible}
            >
              Submit Loan Request
            </Button>
          </View>
        ) : (
          <View style={styles.notEligibleContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              Go Back
            </Button>
          </View>
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
    padding: 15,
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
  eligibilityCard: {
    marginBottom: 15,
    elevation: 2,
  },
  eligibilityTitle: {
    fontSize: 18,
  },
  eligibilityMessage: {
    marginTop: 5,
  },
  maxAmount: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  loanTypeCard: {
    marginBottom: 10,
    elevation: 1,
  },
  loanTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loanTypeName: {
    fontSize: 16,
    marginLeft: 10,
  },
  loanTypeDescription: {
    marginTop: 5,
    marginLeft: 35,
  },
  loanTypeDetails: {
    marginTop: 10,
    marginLeft: 35,
  },
  loanTypeDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  summaryCard: {
    marginTop: 15,
    marginBottom: 15,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
  },
  termsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
  },
  viewTermsText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginLeft: 30,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
  },
  notEligibleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
  },
});

export default RequestLoanScreen;