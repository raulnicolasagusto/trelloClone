import { Colors } from '@/constants/Colors';
import { ModalType } from '@/types/enums';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AuthModalProps {
  authType: ModalType | null;
  onClose: () => void;
}

const AuthModal = ({authType, onClose}:AuthModalProps) => {
  if (!authType) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{authType === ModalType.Login ? 'Log in' : 'Sign up'}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.formText}>Email</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Enter your email</Text>
        </View>
        <Text style={styles.formText}>Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Enter your password</Text>
        </View>
        {authType === ModalType.Login && (
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        )}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>{authType === ModalType.Login ? 'Log in' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    gap: 15,
  },
  formText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
  },
  placeholder: {
    color: '#fff',
    opacity: 0.7,
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuthModal