import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../../../Utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileItems from '../../../Common/ProfileItems';
import { useNavigation } from '@react-navigation/native';

const Profile = ({onJobsClick}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem('Name');
        const id = await AsyncStorage.getItem('RegeID');
        const qualification = await AsyncStorage.getItem('Qualification');
        const speciality = await AsyncStorage.getItem('Speciality');
        const bio = await AsyncStorage.getItem('Bio');
        const specialisedTreatment = await AsyncStorage.getItem('Treatment');
        const industryExperience = await AsyncStorage.getItem('IndustryExperience');
        const clinicAddress = await AsyncStorage.getItem('ClinicAddress');

        // Check if any of the required data is missing
        if (!name || !qualification || !speciality) {
          throw new Error('Missing required user data');
        }

        const userData = {
          name,
          id,
          qualification,
          speciality,
          bio,
          specialisedTreatment,
          industryExperience,
          clinicAddress,
        };

        setUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('UserSelection');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profile}>
        <TouchableOpacity>
          <Image source={require('../../../Resources/Images/profile.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.picChange}>Change Profile Picture</Text>
        <Text style={styles.picChange} onPress={() => { navigation.navigate("UpdateDoctorsProfile")}}>Update Profile</Text>
        {loading ? (
          <ActivityIndicator size="small" color={BG_COLOR} />
        ) : (
          <>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text style={styles.name}>{userData?.qualification}</Text>
            <Text style={styles.name}>{userData?.speciality}</Text>
          </>
        )}
      </View>
      <View style={styles.profileOptions}>
        <ProfileItems icon={require('../../../Resources/Images/appointment.png')} title={'My Appointments (5)'} onClick={() => {
          onJobsClick() 
        }}/>
        <ProfileItems icon={require('../../../Resources/Images/theme.png')} title={'Change Theme'} onClick={() => {
          
        }}/>
        <ProfileItems icon={require('../../../Resources/Images/logout.png')} title={'Logout'} onClick={() => {
          handleLogout()
        }}/>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    height: moderateScale(300), // Adjust the height as needed
    backgroundColor: TEXT_COLOR,
    alignSelf: 'center',
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    alignItems: 'center',
    padding: moderateScale(20),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: BG_COLOR,
    tintColor: 'lightgray',
    // marginVertical: moderateScale(10),
  },
  picChange: {
    textDecorationLine: 'underline',
    color: BG_COLOR,
    fontSize: moderateScale(12),
    marginTop: moderateVerticalScale(10),
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: BG_COLOR,
    marginTop: moderateScale(8),
  },
  profileOptions: {
    marginTop: moderateVerticalScale(20),
  },
});
