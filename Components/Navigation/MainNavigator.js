import { View, Text } from 'react-native'
import React from 'react'
import Splash from '../Screens/OnBoarding/Splash'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Doctor from './Doctor'
import Patient from './Patient'
import UserSelection from '../Screens/OnBoarding/UserSelection'
import DoctorProfile from '../Screens/Doctor/DoctorProfile';
import UpdateDoctorsProfile from '../Screens/Doctor/UpdateDoctorsProfile';
import Profile from '../Screens/Doctor/Tabs/Profile';

const STACK = createStackNavigator()
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen 
          name='Splash'
          component={Splash}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='UpdateDoctorsProfile'
          component={UpdateDoctorsProfile}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='Profile'
          component={Profile}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='DoctorProfile'
          component={DoctorProfile}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='UserSelection'
          component={UserSelection}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='Doctor'
          component={Doctor}
          options={{headerShown: false}} 
        />
        <STACK.Screen 
          name='Patient'
          component={Patient}
          options={{headerShown: false}} 
        />
      </STACK.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigator