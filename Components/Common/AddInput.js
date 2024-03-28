import React from 'react';
import { View, Text, TextInput, StyleSheet, map } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../Utils/color';

const AddSection = ({ title, placeholder, entries, onUpdateEntry, onAddEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {entries.map((entry, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={entry.value}
            onChangeText={(text) => onUpdateEntry(index, text)}
            placeholder={`${placeholder} ${index + 1}`}
          />
        </View>
      ))}
      <Text style={styles.addButton} onPress={onAddEntry}>
        + Add {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(18),
    color: TEXT_COLOR,
    marginBottom: moderateScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  input: {
    flex: 1,
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingLeft: moderateScale(10),
    backgroundColor: BG_COLOR,
  },
  addButton: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    textDecorationLine: 'underline',
    marginTop: moderateScale(10),
  },
});

export default AddSection;
