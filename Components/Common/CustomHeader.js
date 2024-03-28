import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            onBackPress()
        }}>
            <Image source={require('../Resources/Images/back.png')} style={styles.icons}/>
        </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        paddingLeft: moderateScale(15),
        alignItems: 'center',
        alignSelf: 'center'
        // justifyContent: 'center'
    },
    icons: {
        width: scale(24),
        height: scale(24),
    },
    title: {
        fontSize: moderateScale(18),
        marginLeft: moderateScale(10),
    },
})