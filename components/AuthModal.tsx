import { ModalType } from '@/types/enums';
import React from 'react';
import { Text, View } from 'react-native';

interface AuthModalProps {
  authType: ModalType | null;
}

const AuthModal = ({authType}:AuthModalProps) => {
  return (
    <View>
      <Text>AuthModal</Text>
    </View>
  )
}

export default AuthModal