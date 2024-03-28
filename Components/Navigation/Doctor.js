import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import DoctorLogin from '../Screens/Doctor/DoctorLogin';
import DoctorSignup from '../Screens/Doctor/DoctorSignup';
import DoctorProfile from '../Screens/Doctor/DoctorProfile';
import Registration from '../Screens/Doctor/Registration';

const STACK = createStackNavigator()
const Doctor = () => {
  return (
      <STACK.Navigator>
        <STACK.Screen 
          name='DoctorLogin'
          component={DoctorLogin}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='DoctorSignup'
          component={DoctorSignup}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='Registration'
          component={Registration}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='DoctorProfile'
          component={DoctorProfile}
          options={{headerShown: false}} 
        />
      </STACK.Navigator>
  )
}

export default Doctor