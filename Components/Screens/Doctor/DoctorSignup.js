import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../Utils/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../Common/CustomTextInput'
import CustomSolidBtn from '../../Common/CustomSolidBtn'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../Common/Loader'
import firestore from '@react-native-firebase/firestore';
import CustomDropDownInput from '../../Common/CustomDropDown';

const DoctorSignup = () => {

  const navigation = useNavigation()
  const [FirstName, setFirstName] = useState('')
  const [BadFirstName, setBadFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [BadLastName, setBadLastName] = useState('')
  const [Email, setEmail] = useState('')
  const [BadEmail, setBadEmail] = useState('')
  const [Mobile, setMobile] = useState('')
  const [BadMobile, setBadMobile] = useState('')
  const [RegNum, setRegNum] = useState('')
  const [BadRegNum, setBadRegNum] = useState('')
  // const [Department, setDepartment] = useState('')
  const [Department, setDepartment] = useState(null)
  const [BadDepartment, setBadDepartment] = useState('')
  const [Password, setPassword] = useState('')
  const [BadPassword, setBadPassword] = useState('')
  const [Loading, setLoading] = useState(false)
  const [AccountCreated, setAccountCreated] = useState(false)

  const departmentList = [
    'Cardiology',
    'Gastroenterology',
    'Gynaecology',
    'Medicine',
    'Psychiatry',
    'Dermatology',
    'ENT',
    'Orthopedics',
    'Radiology',
    'Surgery',
    'Neurology',
    'Cardiothoracic Surgery',
    'Critical Care',
    'Dental',
    'Emergency Medicine',
    'Haematology',
    'Nephrology',
    'Pharmacy Department',
    'Urology',
    'Biochemistry',
    'Endocrinology',
    'Paediatrics',
    'Ophthalmology',
    'Anaesthetics',
  ];

  const validate=()=>{
    let nameRegex = /^[A-Za-z\s]+$/
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let numRegex = /^[0-9]+$/
    let passRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    let validEmail = true
    let validFirstName = true
    let validLastName = true
    let validMobile = true
    let validRegNum = true
    let validDepartment = true
    let validPass = true
    
    {if(FirstName==''){
      validFirstName = false;
      setBadFirstName('Please Enter Name');
    }else if(FirstName!='' && FirstName.length<=3){
      validFirstName = false;
      setBadFirstName('Please Enter Valid Name');
    }else if(FirstName!='' && FirstName.length>3 && !FirstName.toString().match(nameRegex)){
      validFirstName = false;
      setBadFirstName('Please Enter Valid Name');
    }else if(FirstName!='' && FirstName.length>3 && FirstName.toString().match(nameRegex)){
      validFirstName = true;
      setBadFirstName('');
    }}

    {if(LastName==''){
      validLastName = false;
      setBadLastName('Please Enter Name');
    }else if(LastName!='' && LastName.length<3){
      validLastName = false;
      setBadLastName('Please Enter Valid Name');
    }else if(LastName!='' && LastName.length>=3 && !LastName.toString().match(nameRegex)){
      validLastName = false;
      setBadLastName('Please Enter Valid Name');
    }else if(LastName!='' && LastName.length>=3 && LastName.toString().match(nameRegex)){
      validLastName = true;
      setBadLastName('');
    }}

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

    if(Mobile==''){
      validMobile = false;
      setBadMobile('Please Enter Mobile Number');
    }else if(Mobile!='' && (Mobile.length!=10 || !Mobile.toString().match(numRegex))){
      validMobile = false;
      setBadMobile('Please Enter Valid Mobile Number');
    }else if(Mobile!='' && Mobile.length==10 && Mobile.toString().match(numRegex)){
      validMobile = true;
      setBadMobile('');
    }

    if(RegNum==''){
      validRegNum = false;
      setBadRegNum('Please Enter RegNum Number');
    }else if(RegNum!='' && !Mobile.toString().match(numRegex)){
      validRegNum = false;
      setBadRegNum('Please Enter Valid RegNum Number');
    }else if(RegNum!='' && RegNum.toString().match(numRegex)){
      validRegNum = true;
      setBadRegNum('');
    }

    {if(Department==''){
      validDepartment = false;
      setBadDepartment('Please Select Department');
     }else if(Department!=''){
        validDepartment = true;
        setBadDepartment('');
     }
     //else if(Department!='' && !Department.toString().match(nameRegex)){
    //   validLastName = false;
    //   setBadDepartment('Please Enter Valid Department');
    // }else if(Department!='' && Department.toString().match(nameRegex)){
    //   validDepartment = true;
    //   setBadDepartment('');
     }//}

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

    return validFirstName && validLastName && validEmail && validMobile && validRegNum && validDepartment &&validPass
  }
  const registerUser= async ()=>{
    setLoading(true)

    const emailExists = await firestore()
    .collection('Doctors')
    .where('Email', '==', Email)
    .get()
    .then((querySnapshot) => {
      return !querySnapshot.empty;
    })
    .catch((error) => {
      console.error('Error checking email existence:', error);
      return true; // Assume an error, treat as if email exists
    });

  if (emailExists) {
    setLoading(false);
    Alert.alert('Email already exists. Please use a different email.');
    return;
  }

    firestore().collection("Doctors").add({
      FirstName, LastName, Email, Mobile, RegNum, Department, Password,
    }).then(()=>{
      setFirstName(''); setLastName(''); setEmail(''); setMobile(''); setRegNum(''); setDepartment(''); setPassword('');
      setAccountCreated(true);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Registration', {email: Email});
      }, 3000);
    }).catch(error=>{
      setLoading(false);
      Alert.alert(error);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      {!AccountCreated?(<ScrollView>
        <Image source={require('../../Resources/Images/healthcare.png')} 
        style={styles.logo}/>
        <Text style={styles.title}>Medisphere</Text>
        <Text style={styles.title}>Welcome Doctor</Text>
        <Text style={styles.subTitle}>Create Account</Text>
        <View>
          <CustomTextInput style={styles.name} value={FirstName} onChangeText={txt => {setFirstName(txt);}} 
          title="First Name" placeholder={'Aatmaram'} bad={BadFirstName != ''?true:false}/>
          {BadFirstName != '' && <Text style={styles.errorMsg}>{BadFirstName}</Text>}

          <CustomTextInput value={LastName} onChangeText={txt => {setLastName(txt);}} 
          title="Last Name" placeholder={'Ganchi'} bad={BadLastName != ''?true:false} />
          {BadLastName != '' && <Text style={styles.errorMsg}>{BadLastName}</Text>}
        </View>
        <CustomTextInput value={Email} onChangeText={txt => {setEmail(txt);}} 
        title="Email" placeholder={'aatmaramganchi@gmail.com'} bad={BadEmail != ''?true:false}/>
        {BadEmail != '' && <Text style={styles.errorMsg}>{BadEmail}</Text>}

        <CustomTextInput value={Mobile} onChangeText={txt => {setMobile(txt);}} 
        title="Mobile No" placeholder={'1234567890'} bad={BadMobile != ''?true:false}/>
        {BadMobile != '' && <Text style={styles.errorMsg}>{BadMobile}</Text>}

        <CustomTextInput value={RegNum} onChangeText={txt => {setRegNum(txt);}} 
        title="Registration Number" placeholder={'1234567890'} bad={BadRegNum != ''?true:false}/>
        {BadRegNum != '' && <Text style={styles.errorMsg}>{BadRegNum}</Text>}

        {/* <CustomTextInput value={Department} onChangeText={txt => {setDepartment(txt);}} 
        title="Department" placeholder={'Neurology'} bad={BadDepartment != ''?true:false}/>
        {BadDepartment != '' && <Text style={styles.errorMsg}>{BadDepartment}</Text>} */}

        <CustomDropDownInput
          title="Department"
          data={departmentList}
          selectedValue={Department}
          onValueChange={(value) => setDepartment(value)}
          />
        {BadDepartment != '' && <Text style={styles.errorMsg}>{BadDepartment}</Text>}
        {/* <Text>{Department}</Text> */}
        <CustomTextInput value={Password} onChangeText={txt => {setPassword(txt);}} 
        title="Password" placeholder={'xxxxxx'} bad={BadPassword != ''?true:false}/>
        {BadPassword != '' && <Text style={styles.errorMsg}>{BadPassword}</Text>}

        <View>
        <CustomSolidBtn title={'Sign Up'} onClick={()=>{
          if(validate()){
            registerUser()
          }
        }}/>
        <CustomSolidBtn title={'LOGIN'} onClick={()=>{
          navigation.goBack()
        }}/>
        </View>
        <Loader visible={Loading}/>
      </ScrollView>):(
        <View style={styles.done}>
          <Image source={require('../../Resources/Images/check.png')} style={styles.logo}/>
          <Text>{"Account Created"}</Text>
        </View>
      )}
      
    </SafeAreaView>
  )
}

export default DoctorSignup

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