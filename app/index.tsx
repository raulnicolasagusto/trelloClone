import { Colors } from '@/constants/Colors';
import { ModalType } from '@/types/enums';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal
} from '@gorhom/bottom-sheet';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthModal from '@/components/AuthModal';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);

  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://morohome.com.ar');
  };

  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `no puedes iniciar sesion o registrarte?`,
      },
      (selectedIndex: any) => {
        switch (selectedIndex) {
          case 1:
            // Support
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };

  const handleClose = () => {
    setAuthType(null);
    bottomSheetModalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  return (
    <>
      <View style={[styles.container, { paddingTop: top + 30 }]}>
        <Image source={require('@/assets/images/login/trello.png')} style={styles.image} />
        <Text style={styles.introText}>Move teamwork forward - even on the go</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: 'white' }]}
            onPress={() => showModal(ModalType.Login)}>
            <Text style={[styles.btnText, { color: Colors.primary }]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn]} onPress={() => showModal(ModalType.SignUp)}>
            <Text style={[styles.btnText, { color: '#fff' }]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            By signing up, you agree to the{' '}
            <Text style={styles.link} onPress={openLink}>
              User Notice
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
            .
          </Text>

          <Text style={styles.link} onPress={openActionSheet}>
            Can't log in our sign up?
          </Text>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleComponent={null}
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
      >
        <AuthModal authType={authType} onClose={handleClose} />
      </BottomSheetModal>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: 'contain',
  },
  introText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 17,
    padding: 30,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 40,
    gap: 10,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 60,
  },
  link: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});