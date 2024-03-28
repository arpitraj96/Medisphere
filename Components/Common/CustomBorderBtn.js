import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../Utils/color'

const CustomBorderBtn = ({title, onClick}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>{onClick()}}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBorderBtn

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: verticalScale(45),
        borderColor: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    title: {
        color: TEXT_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16),
    },
})