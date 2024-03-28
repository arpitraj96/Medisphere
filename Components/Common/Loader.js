import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../Utils/color'

const Loader = ({visible}) => {
  return (
    <Modal transparent visible = {visible} style={{flex: 1}}>
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{width: scale(60), height: scale(60), backgroundColor: TEXT_COLOR, borderRadius: moderateScale(10), justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size={'large'}/>
            </View>
        </View>
    </Modal>
  )
}

export default Loader