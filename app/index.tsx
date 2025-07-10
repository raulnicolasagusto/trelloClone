import { Colors } from '@/constants/Colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Index() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={ [styles.container, {paddingTop: top},]}
    >
      <Image source={require('@/assets/images/login/trello.png')} style={styles.image} />
      <Text style={styles.introText}>Hacemos avanzar el trabajo en equipo</Text>
      <View style={styles.buttomContainer}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#fff'}]}>
          <Text style={[styles.btnText,{ color:Colors.primary }]}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={[styles.btnText,{ color:'#fff'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  }
})