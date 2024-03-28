import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'

const ProfileItems = ({title, icon, onClick}) => {
  return (
    <TouchableOpacity style={{width:'90%', alignSelf:'center', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:moderateVerticalScale(20)}} onPress={() => {
        onClick()
    }}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={icon} style={{width:scale(20), height:scale(20)}}/>
            <Text style={{marginLeft:moderateScale(15), fontSize:moderateScale(18)}}>{title}</Text>
        </View>
        <Image source={require('../Resources/Images/right.png')} style={{width:scale(15), height:scale(15)}}/>
    </TouchableOpacity>
  )
}

export default ProfileItems