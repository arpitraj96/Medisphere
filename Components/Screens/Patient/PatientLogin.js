import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import CustomTextInput from '../../Common/CustomTextInput';
import CustomSolidBtn from '../../Common/CustomSolidBtn';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../Common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorLogin = () => {
  const navigation = useNavigation();

  const [Email, setEmail] = useState('');
  const [BadEmail, setBadEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [BadPassword, setBadPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const validate = () => {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    let validEmail = true
    let validPass = true

    {if(Email==''){
      validEmail = false;
      setBadEmail('Please Enter Email')
    }else if(Email!='' && !Email.toString().match(emailRegex)){
      validEmail = false;
      setBadEmail('Please Enter Valid Email');
    }else if(Email!='' && Email.toString().match(emailRegex)){
      validEmail = true;
      setBadEmail('');
    }}

    if(Password==''){
      validPass = false;
      setBadPassword('Please Enter Password');
    }else if(Password!='' && Password.length<8){
      validPass = false;
      setBadPassword('Min size is 8');
    }else if(Password!='' && Password.length>=8 && !Password.toString().match(passRegex)){
      validPass = false;
      setBadPassword('Please include alphanumerics and special characters');
    }else if(Password!='' && Password.length>=8 && Password.toString().match(passRegex)){
      validPass = true;
      setBadPassword('');
    }

    return validEmail && validPass
  };

  const loginUser = async () => {
    setLoading(true);

    try {
      const querySnapshot = await firestore()
        .collection('Doctors')
        .where('Email', '==', Email)
        .get();

      if (querySnapshot.size > 0) {
        const userPromises = querySnapshot.docs.map(async (doc) => {
          const userData = doc.data();

          if (userData.Password === Password) {
            setBadEmail('');
            setBadPassword('');
            setLoading(true);

            try {
              const registeredDoctorSnapshot = await firestore()
                .collection('RegisteredDoctor')
                .where('Email', '==', Email)
                .get();

              if (registeredDoctorSnapshot.size > 0) {
                const registeredDoctorData = registeredDoctorSnapshot.docs[0].data();
                registrationPage(
                  doc.id,
                  userData.YourName,
                  userData.HighestQualification,
                  userData.Speciality,
                  userData.ProfessionalBio,
                  userData.SpecialisedTreatment,
                  userData.IndustryExperience,
                  userData.ClinicAddress,
                  userData.AwardsPublications
                );
              } else {
                console.warn('No data found in RegisteredDoctor collection for the user');
              }

              mainPage(doc.id, userData.Email, userData.YourName);
            } catch (error) {
              console.error('Error fetching data from RegisteredDoctor collection:', error);
              setLoading(false);
            }
          } else {
            setBadPassword('Wrong Password');
          }
        });

        await Promise.all(userPromises);
      } else {
        setBadEmail('No User Found');
      }
    } catch (error) {
      console.error('Error fetching data from Doctors collection:', error);
      setLoading(false);
    }
  };

  const mainPage = async (id, email, name) => {
    await AsyncStorage.setItem('Email', email);
    await AsyncStorage.setItem('User_ID', id);
    await AsyncStorage.setItem('User_Type', 'Doctor');
    navigation.navigate('DoctorProfile');
  };

  const registrationPage = async (
    id,
    name,
    qualification,
    speciality,
    bio,
    specialisedTreatment,
    industryExperience,
    clinicAddress,
    awardsPublications
  ) => {
    await AsyncStorage.setItem('RegeID', id);
    await AsyncStorage.setItem('Name', name);
    await AsyncStorage.setItem('Qualification', qualification);
    await AsyncStorage.setItem('Speciality', speciality);
    await AsyncStorage.setItem('Bio', bio);
    await AsyncStorage.setItem('Treatment', specialisedTreatment);
    await AsyncStorage.setItem('IndustryExperience', industryExperience);
    await AsyncStorage.setItem('ClinicAddress', clinicAddress);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../Resources/Images/healthcare.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Doctor</Text>
      <Text style={styles.subTitle}>Login</Text>
      <CustomTextInput
        value={Email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        title="Email"
        placeholder={'xyz@gmail.com'}
        bad={BadEmail != '' ? true : false}
      />
      {BadEmail != '' && <Text style={styles.errorMsg}>{BadEmail}</Text>}
      <CustomTextInput
        value={Password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        title="Password"
        placeholder={'xxxxxx'}
        bad={BadPassword != '' ? true : false}
      />
      {BadPassword != '' && <Text style={styles.errorMsg}>{BadPassword}</Text>}
      <Text style={styles.forgot}>Forgot Password</Text>
      <CustomSolidBtn
        onClick={() => {
          if (validate()) {
            loginUser();
          }
        }}
        title={'LOGIN'}
      />
      <CustomSolidBtn onClick={() => navigation.navigate('DoctorSignup')} title={'New User, Create Account'} />
      <Loader visible={Loading} />
    </SafeAreaView>
  );
};

export default DoctorLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(20),
    color: TEXT_COLOR,
  },
  subTitle: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '800',
    marginTop: moderateVerticalScale(10),
    color: TEXT_COLOR,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
    marginTop: moderateVerticalScale(10),
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
  errorMsg: {
    marginLeft: moderateScale(20),
    color: 'red',
  },
});
