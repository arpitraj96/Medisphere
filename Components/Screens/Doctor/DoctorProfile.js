import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color'
import { scale, verticalScale } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Appointment from './Tabs/Appointment'
import Chat from './Tabs/Chat'
import Profile from './Tabs/Profile'

const DoctorProfile = () => {
    const [selectedTab, setselectedTab] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
        {selectedTab==0?<Appointment/>:selectedTab==1?<Chat/>:<Profile onJobsClick = {() => {
            setselectedTab(0);
        }}/>}
        <View style={styles.bottomView}>
            <TouchableOpacity 
            style={[styles.bottomTab, {borderTopWidth:selectedTab==0?1:0}]} 
            onPress={()=>{
                    setselectedTab(0);
                }}>
                <Image source={require('../../Resources/Images/appointment.png')} style={[styles.tabIcon, {tintColor:selectedTab==0?'#08D0F8':'black'}]}/>
            </TouchableOpacity>
            
            {/* <TouchableOpacity style={styles.bottomTab}>
                <Image source={require('../../Resources/Images/post.png')} style={styles.tabIcon}/>
            </TouchableOpacity> */}

            <TouchableOpacity style={[styles.bottomTab, {borderTopWidth:selectedTab==1?1:0}]} 
            onPress={()=>{
                    setselectedTab(1);
                }}>
                <Image source={require('../../Resources/Images/chat.png')} style={[styles.tabIcon, {tintColor:selectedTab==1?'#08D0F8':'black'}]}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bottomTab,{borderTopWidth:selectedTab==2?1:0}]} 
            onPress={()=>{
                    setselectedTab(2);
                }}>
                <Image source={require('../../Resources/Images/profile.png')} style={[styles.tabIcon, {tintColor:selectedTab==2?'#08D0F8':'black'}]}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default DoctorProfile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,

    },
    bottomView: {
        width: '100%',
        height: verticalScale(40),
        backgroundColor: BG_COLOR,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset:{x: 0, y: 1},
        position:'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bottomTab: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIcon: {
        width: scale(27),
        height: scale(27),
    },
})