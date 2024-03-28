import { View, Text, StyleSheet, placeholder} from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../Utils/color'
import { TextInput } from 'react-native-gesture-handler'

const CustomTextInput = ({title, placeholder, value, onChangeText, bad}) => {
  return (
    <View style={[styles.input, {borderColor:bad?'red':'black'}]}>
      <Text style={[styles.title, {color:bad?'red':'black'}]}>{title}</Text>
      <TextInput value={value} onChangeText={txt => onChangeText(txt)} placeholder={placeholder}/>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    input: {
      width: '90%',
      height: verticalScale(42),
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: moderateVerticalScale(20),
      borderRadius: moderateScale(10),
      elevation: 10,
      backgroundColor: BG_COLOR,
      justifyContent: 'center',
      paddingLeft: moderateScale(15),
      paddingRight: moderateScale(15),
    },
    title: {
      alignSelf: 'flex-start',
      marginLeft: moderateScale(20),
      top: -moderateScale(8),
      position: 'absolute',
      backgroundColor: BG_COLOR,  
      paddingLeft: moderateScale(10),
      paddingRight: moderateScale(10),
      color: TEXT_COLOR,
    },
})