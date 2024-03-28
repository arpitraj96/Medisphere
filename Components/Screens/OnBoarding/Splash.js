import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {
  const navigation = useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
      getData();
  },2000)
    })

  const getData = async() =>{
    let type = await AsyncStorage.getItem("User_Type")
    if(type!=null){
      if(type=='Doctor'){
        navigation.navigate('DoctorProfile')
      }
    }else{
      navigation.navigate('UserSelection')
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../Resources/Images/healthcare.png')} style={styles.logo}/>
      <Text style={styles.tittle}>Medisphere</Text>
      <Text style={styles.subTittle}>Medical Services on Your Fingertips</Text>
    </View>
  )
}
export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_COLOR,
    },
    logo: {
        width: scale(100),
        height: verticalScale(100),
    },
    tittle: {
        fontSize: moderateScale(35),
        fontWeight: '600',
        marginTop: moderateVerticalScale(10),
        color: TEXT_COLOR,
    },
    subTittle: {
        fontSize: moderateScale(16),
        fontStyle: 'italic',
        position: 'absolute',
        bottom: moderateVerticalScale(50),  
        fontWeight: '600',
        color: TEXT_COLOR,
    },
})