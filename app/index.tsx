import AuthModal from '@/components/AuthModal';
import { Colors } from '@/constants/Colors';
import { ModalType } from '@/types/enums';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null); 

  const snapPoints = useMemo(() => ['33%'], []);//esto es para los diferentes breakponts
  const [authType, setAuthType] = useState<ModalType | null>(null);// usamos este type para distinguir entre login y sign up, esto va la funcion showmodal

  const openLink = (url:string) => {
    WebBrowser.openBrowserAsync('https://morohome.com.ar');
  };

  const openActionSheet = async () => {
    const option = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options: option,
        cancelButtonIndex,
        title: 'Tienes problemas para iniciar sesion o registrarte?'
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    );

  };

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
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
    <BottomSheetModalProvider>
      <View
        style={ [styles.container, {paddingTop: top},]}
      >
        <Image source={require('@/assets/images/login/trello.png')} style={styles.image} />
        <Text style={styles.introText}>Hacemos avanzar el trabajo en equipo</Text>
        <View style={styles.buttomContainer}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#fff'}]} onPress={()=>showModal(ModalType.Login)}>
            <Text style={[styles.btnText,{ color:Colors.primary }]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>showModal(ModalType.SignUp)}>
            <Text style={[styles.btnText,{ color:'#fff'}]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.description}>Al iniciar sesi on, estas de acuerdo con las
            <Text style={styles.link} onPress={()=>openLink}> Politicas de Usuario</Text>
          </Text>
          <Text style={styles.link} onPress={openActionSheet}>
            No puedes iniciar sesion o registrarte?
          </Text>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        enableOverDrag={false}
        enablePanDownToClose>
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  image:{
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
  buttomContainer: {
    gap: 10,
    width: '100%',
    paddingHorizontal: 40,

  },
  btn: {
    padding:10,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  btnText:{
    fontSize: 18,
  },
  description:{
    fontSize:12,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 60,
  },
  link:{
    color:'#fff',
    fontSize:12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
})


