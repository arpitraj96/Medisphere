import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../Utils/color'

const CustomSolidBtn = ({title, onClick}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>{onClick()}}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomSolidBtn

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: verticalScale(45),
        backgroundColor: TEXT_COLOR,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        elevation: 20,
        shadowColor: 'black',
    },
    title: {
        color: BG_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16),
    },
})