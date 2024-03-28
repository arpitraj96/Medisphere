import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../Common/CustomTextInput'
import CustomSolidBtn from '../../Common/CustomSolidBtn'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../Common/Loader'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ParaghrapInput from '../../Common/ParaghraphInput'
import AddSection from '../../Common/AddInput'
import CustomHeader from '../../Common/CustomHeader'

const UpdateDoctorsProfile = () => {
  const navigation = useNavigation()
  const [HighestQualification, setHighestQualification] = useState('')
  const [BadHighestQualification, setBadHighestQualification] = useState('')
  const [Speciality, setSpeciality] = useState('')
  const [BadSpeciality, setBadSpeciality] = useState('')
  const [ProfessionalBio, setProfessionalBio] = useState('')
  const [BadProfessionalBio, setBadProfessionalBio] = useState('')
  const [SpecialisedTreatment, setSpecialisedTreatment] = useState('')
  const [BadSpecialisedTreatment, setBadSpecialisedTreatment] = useState('')
  const [IndustryExperience, setIndustryExperience] = useState('')
  const [BadIndustryExperience, setBadIndustryExperience] = useState('')
  const [ClinicAddress, setClinicAddress] = useState('')
  const [BadClinicAddress, setBadClinicAddress] = useState('')
  const [Loading, setLoading] = useState(false)
  const [DoneRegistration, setDoneRegistration] = useState(false)
  const [awardsPublications, setAwardsPublications] = useState([{ id: 1, value: '' }]);

  const validate=()=>{
    let SpecialityRegex = /^[a-zA-Z,.\- ]+$/;
    let validSpeciality = true
    let validHighestQualification = true
    let validProfessionalBio = true
    let validSpecialisedTreatment = true
    let validIndustryExperience = true
    let validClinicAddress = true

    {if(HighestQualification==''){
      validHighestQualification = false;
      setBadHighestQualification('Please Enter Highest Qualification');
    }else if(HighestQualification!='' && HighestQualification.length<3){
      validHighestQualification = false;
      setBadHighestQualification('Please Enter Valid Name');
    }else if(HighestQualification!='' && !HighestQualification.toString().match(SpecialityRegex)){
      validHighestQualification = false;
      setBadHighestQualification('Please Enter Valid Name');
    }else if(HighestQualification!='' && HighestQualification.toString().match(SpecialityRegex)){
      validHighestQualification = true;
      setBadHighestQualification('');
    }}

    {if(Speciality==''){
      validSpeciality = false;
      setBadSpeciality('Please Enter Speciality')
    }else if(Speciality!='' && !Speciality.toString().match(SpecialityRegex)){
      validSpeciality = false;
      setBadSpeciality('Please Enter Valid Speciality');
    }else if(Speciality!='' && Speciality.toString().match(SpecialityRegex)){
      validSpeciality = true;
      setBadSpeciality('');
    }}

    if(ProfessionalBio==''){
      validProfessionalBio = false;
      setBadProfessionalBio('Please Enter Professional Bio');
    }else if(ProfessionalBio!='' && !ProfessionalBio.toString().match(SpecialityRegex)){
      validProfessionalBio = false;
      setBadProfessionalBio('Please Enter Valid Professional Bio');
    }else if(ProfessionalBio!='' && ProfessionalBio.toString().match(SpecialityRegex)){
      validProfessionalBio = true;
      setBadProfessionalBio('');
    }

    if(SpecialisedTreatment==''){
      validSpecialisedTreatment = false;
      setBadSpecialisedTreatment('Please Enter Specialised Treatment');
    }else if(SpecialisedTreatment!='' && !ProfessionalBio.toString().match(SpecialityRegex)){
      validSpecialisedTreatment = false;
      setBadSpecialisedTreatment('Please Enter Valid Specialised Treatment');
    }else if(SpecialisedTreatment!='' && SpecialisedTreatment.toString().match(SpecialityRegex)){
      validSpecialisedTreatment = true;
      setBadSpecialisedTreatment('');
    }

    {if(IndustryExperience==''){
      validIndustryExperience = false;
      setBadIndustryExperience('Please Enter Industry Experience');
    }else if(IndustryExperience!='' && !IndustryExperience.toString().match(SpecialityRegex)){
      validHighestQualification = false;
      setBadIndustryExperience('Please Enter Valid Industry Experience');
    }else if(IndustryExperience!='' && IndustryExperience.toString().match(SpecialityRegex)){
      validIndustryExperience = true;
      setBadIndustryExperience('');
    }}

    if(ClinicAddress==''){
      validClinicAddress = false;
      setBadClinicAddress('Please Enter Clinic Address');
    }else if(ClinicAddress!='' && !ClinicAddress.toString().match(SpecialityRegex)){
      validClinicAddress = false;
      setBadClinicAddress('Please Enter Valid Clinic Address');
    }else if(ClinicAddress!='' && ClinicAddress.toString().match(SpecialityRegex)){
      validClinicAddress = true;
      setBadClinicAddress('');
    }

    return validHighestQualification && validSpeciality && validProfessionalBio && validSpecialisedTreatment && validIndustryExperience &&validClinicAddress
  }

  const updateAwardsPublicationsEntry = (index, value) => {
    setAwardsPublications((prevEntries) =>
      prevEntries.map((entry, i) => (i === index ? { ...entry, value } : entry))
    );
  };

  const addAwardsPublicationsEntry = () => {
    setAwardsPublications((prevEntries) => [
      ...prevEntries,
      { id: prevEntries.length + 1, value: '' },
    ]);
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      // Retrieve the document ID from AsyncStorage
      const documentId = await AsyncStorage.getItem("RegeID");
      if (!documentId) {
        throw new Error("Document ID not found in AsyncStorage");
      }
      // documentId = 'QQodPTJJ0ZAa5Hd9cYHY'
      const userRef = firestore().collection("RegisteredDoctor").doc(documentId);
      await userRef.update({
        HighestQualification,
        Speciality,
        ProfessionalBio,
        SpecialisedTreatment,
        IndustryExperience,
        ClinicAddress,
        AwardsPublications: awardsPublications.map(entry => entry.value),
      });
      setDoneRegistration(true);
      setLoading(false);
      mainPage(
        HighestQualification,
        Speciality,
        ProfessionalBio,
        SpecialisedTreatment,
        IndustryExperience,
        ClinicAddress
      );
      navigation.navigate("DoctorLogin");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const mainPage = async(qualification,speciality,bio,specialisedTreatment,industryExperience,clinicAddress) => {
    // await AsyncStorage.setItem("RegeID",id)
    await AsyncStorage.setItem("Qualification",qualification)
    await AsyncStorage.setItem("Speciality",speciality)
    await AsyncStorage.setItem("Bio",bio)
    await AsyncStorage.setItem("Treatment",specialisedTreatment)
    await AsyncStorage.setItem("IndustryExperience",industryExperience)
    await AsyncStorage.setItem("ClinicAddress",clinicAddress)
    navigation.navigate("Profile")
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Update Profile'} onBackPress={() => {
            navigation.goBack();
        }}/>
      {!DoneRegistration?(<ScrollView>
        <Image source={require('../../Resources/Images/healthcare.png')} 
        style={styles.logo}/>
        <Text style={styles.subTitle}>Edit Profile</Text>
        <View>
          <CustomTextInput value={HighestQualification} onChangeText={txt => {setHighestQualification(txt);}} 
          title="Highest Qualification" placeholder={'MBBS'} bad={BadHighestQualification != ''?true:false} />
          {BadHighestQualification != '' && <Text style={styles.errorMsg}>{BadHighestQualification}</Text>}
        </View>
        <ParaghrapInput value={Speciality} onChangeText={txt => {setSpeciality(txt);}} 
        title="Speciality" placeholder={'Family Physician, General Surgery, Nasal Endoscopic Surgery'} bad={BadSpeciality != ''?true:false}/>
        {BadSpeciality != '' && <Text style={styles.errorMsg}>{BadSpeciality}</Text>}

        <ParaghrapInput value={ProfessionalBio} onChangeText={txt => {setProfessionalBio(txt);}} 
        title="Professional Bio" placeholder={'A competent ENT Surgeon practising for the past 13 years and having a wide range of experience in treating patients with all kinds of ENT issues. Listens to and addresses all of the patients concerns and clearly explains the course of treatment.'} bad={BadProfessionalBio != ''?true:false}/>
        {BadProfessionalBio != '' && <Text style={styles.errorMsg}>{BadProfessionalBio}</Text>}

        <ParaghrapInput value={SpecialisedTreatment} onChangeText={txt => {setSpecialisedTreatment(txt);}} 
        title="Specialised Treatment" placeholder={'Nasal endoscopic sinus surgery, tympanoplasty surgery, skull base surgery, surgery for snoring and micro-ear surgery'} bad={BadSpecialisedTreatment != ''?true:false}/>
        {BadSpecialisedTreatment != '' && <Text style={styles.errorMsg}>{BadSpecialisedTreatment}</Text>}

        <ParaghrapInput value={IndustryExperience} onChangeText={txt => {setIndustryExperience(txt);}} 
        title="Industry Experience" placeholder={'Senior consultant and head ENT, RSTS Hospital, New Delhi, January 2012–present Diagnose and treat ENT injuries in both adults and children Listen and address patients to earn their trust and make them feel safe and comfortable Prescribe medicines and proper treatment and perform surgery when necessary Senior registrar ENT, BCDD College and Hospital, Mumbai, June 2009–December 2011 Managed department of the neck and ear surgery Overseeing ent cases and cochlear implant training and supervising and participating in the ent teaching curriculum for junior residents.'} bad={BadIndustryExperience != ''?true:false}/>
        {BadIndustryExperience != '' && <Text style={styles.errorMsg}>{BadIndustryExperience}</Text>}

        <ParaghrapInput value={ClinicAddress} onChangeText={txt => {setClinicAddress(txt);}} 
        title="Clinic Address" placeholder={'Delhi Road, New Delhi, India, 100000 +9123123123'} bad={BadClinicAddress != ''?true:false}/>
        {BadClinicAddress != '' && <Text style={styles.errorMsg}>{BadClinicAddress}</Text>}
        <AddSection
        title="Awards and Publications"
        placeholder="Enter Awards and Publications"
        entries={awardsPublications}
        onUpdateEntry={updateAwardsPublicationsEntry}
        onAddEntry={addAwardsPublicationsEntry}
      />
        <View>
        <CustomSolidBtn title={'Update'} onClick={()=>{
          if(validate()){
            registerUser()
          }
        }}/>
        </View>
        <Loader visible={Loading}/>
      </ScrollView>):(
        <View style={styles.done}>
          <Image source={require('../../Resources/Images/check.png')} style={styles.logo}/>
          <Text>{"Updated"}</Text>
        </View>
      )}
      
    </SafeAreaView>
  )
}

export default UpdateDoctorsProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(70),
    height: scale(70),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(12),
  },
  title: {
    fontSize: moderateScale(32),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(10),
    color: TEXT_COLOR,
  },
  subTitle: {
    fontSize: moderateScale(22),
    alignSelf: 'flex-start',
    fontWeight: '800',
    marginTop: moderateVerticalScale(10),
    marginLeft: moderateScale(16),
    color: TEXT_COLOR,
  },
  errorMsg: {
    marginLeft: moderateScale(20),
    color: 'red',
  },
  done: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})