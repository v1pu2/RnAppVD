import React, {useState, useRef} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';

import {login} from '../services';

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('eve.holt@reqres.in');
  const [userPassword, setUserPassword] = useState('5cityslicka');
  const passRef = useRef();
  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userEmail) === true) {
      return true;
    } else {
      return false;
    }
  };
  const callApi = async () => {
    const request = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await login(request);
      if (response?.status === 200 && response?.data?.token) {
        Alert.alert(
          'Successfully get the response token',
          response?.data?.token,
        );
      }
    } catch (error) {
      if (error && userPassword === '') {
        Alert.alert('Missing Password');
      } else {
        Alert.alert('Something Went Wrong');
      }
    }
  };
  const validateLogin = () => {
    userEmail && userEmail !== '' && validateEmail() && callApi();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.txtTitle}>Welcome Back</Text>
        <Text style={styles.txtSubTitle}>Sub-title text goes here</Text>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={userEmail}
            placeholder="Email Address *"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passRef.current.focus();
            }}
            onChangeText={item => setUserEmail(item)}
            placeholderTextColor="#8b9cb5"
            underlineColorAndroid="#f000"
          />

          <TextInput
            ref={passRef}
            style={styles.inputStyle}
            value={userPassword}
            onChangeText={item => setUserPassword(item)}
            placeholder="Password *"
            placeholderTextColor="#8b9cb5"
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={() => validateLogin()}
            style={styles.button}>
            <Text style={styles.appButtonText}>{'Login'}</Text>
          </TouchableOpacity>

          <View style={styles.rowView}>
            <View style={styles.leftView}>
              <Text style={styles.txtRemember}>
                {' '}
                <Icon name="check" size={10} color="#4F8EF7" /> Remember
                Password
              </Text>
            </View>
            <Text
              style={styles.txtRemember}
              onPress={() =>
                Alert.alert('Do you want to change the password?')
              }>
              Forgot Password?
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 20,
    color: '#041115',
  },
  txtSubTitle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20,
    color: '#8a979b',
  },
  containerStyle: {
    borderBottomColor: '#efefef',
    height: 30,
    backgroundColor: 'red',
  },
  inputStyle: {
    // flex: 1,
    height: 40,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#eeeeee',
    marginTop: 20,
  },
  SectionStyle: {
    width: 300,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#041115',
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtRemember: {
    color: '#111212',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default LoginScreen;
