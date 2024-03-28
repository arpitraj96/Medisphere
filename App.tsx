import { View, Text, StatusBar, Image } from 'react-native'
import React from 'react'
import MainNavigator from './Components/Navigation/MainNavigator'
import {TEXT_COLOR } from './Components/Utils/color'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={TEXT_COLOR}/>
      <MainNavigator />
    </>
  )
}

export default App


// University
// course
// Grades