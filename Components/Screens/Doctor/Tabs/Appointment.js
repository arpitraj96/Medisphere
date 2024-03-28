import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../../../Utils/color'

const Appointment = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Appointments</Text>
        <View style={{flex: 1}}>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.card, styles.cardElevated]}>
            {/* <Text>TAP</Text> */}
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            {/* <Text>ME</Text> */}
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>TO</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>SCROLL</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>MORE</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>.....😀</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>.....😀</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>.....😀</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>.....😀</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>.....😀</Text>
        </View>
      </ScrollView>
    </View>
    </View>
  )
}

export default Appointment
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    heading: {
        fontSize: moderateScale(25),
        marginLeft: moderateScale(10),
        fontWeight: '600',
        color: TEXT_COLOR,
        // justifyContent: 'center',
        // alignContent: 'center',
        alignSelf: 'center',
    },
    card: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        width: moderateScale(340),
        height: '90%',
        borderRadius: 5,
        margin: 8
    },
    cardElevated: {
        backgroundColor: '#CAD5E2',
        elevation: 6,
        shadowOffset: {
            width: 100,
            height: 100
        },
        shadowColor: TEXT_COLOR,
        shadowOpacity: 0.8,
        shadowRadius: 2
    }
})