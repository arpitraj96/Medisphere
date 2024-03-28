import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const UserSelection = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={require('../../Resources/Images/healthcare.png')}style={styles.logo}/>
      <Text style={styles.title}>You Are</Text>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.doctor} onPress={()=>{
          navigation.navigate("Doctor")
        }}>
          <Text style={styles.btnText}>DOCTOR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.patient} onPress={()=>{
            navigation.navigate("Patient")
          }}>
          <Text style={styles.btnText}>PATIENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserSelection

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
    marginBottom: moderateVerticalScale(50)
},
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  btnView: {
    flexDirection: 'row',
  },
  doctor: {
    width: scale(100),
    height: verticalScale(50),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
    marginHorizontal: moderateScale(20),
    elevation: 25,
  },
  patient: {
    width: scale(100),
    height: verticalScale(50),
    backgroundColor: TEXT_COLOR,
    // borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
    marginHorizontal: moderateScale(20),
    elevation:25,
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
})
