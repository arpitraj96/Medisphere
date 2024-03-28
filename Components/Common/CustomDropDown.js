import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { moderateScale, verticalScale, moderateVerticalScale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../Utils/color';

const CustomDropDownInput = ({ title, data, selectedValue, onValueChange }) => {
  return (
    <View style={styles.input}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => onValueChange(itemValue)}>
        {data.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
    </Picker>
    </View>
  );
};

export default CustomDropDownInput;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: verticalScale(60),
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    elevation: 10,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    top: -moderateScale(8),
    position: 'absolute',
    backgroundColor: BG_COLOR,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    color: 'black',
  },
  picker: {
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    backgroundColor: BG_COLOR,
  },
});
