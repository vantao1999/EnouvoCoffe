/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFormik } from 'formik';
import { NavigationUtils } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMany, getAccount, login } from '../../redux/UserRedux/operations';
import {
  userHistoryTransferOut,
  userHistoryTransferIn,
  getUserHistoryIn,
  getUserHistoryOut,
  //admin
  getHistoryIn,
  getHistoryOut,
} from '../../redux/TransactionRedux/operations';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [data, setData] = React.useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  let emailRef = useRef(null);
  let passRef = useRef(null);

  const navigateScreen = (screen) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'Register',
      passProps: {},
    });
  };
  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_EMAIL) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
    }
  };
  const formik = useFormik({
    initialValues: {
      email: 'vantao.dev@gmail.com',
      password: '123456',
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async ({ email, password }) => {
    Keyboard.dismiss();
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      const user = unwrapResult(result);

      if (user && user.scope === 'admin') {
        await dispatch(getMany(''));
        await dispatch(getHistoryIn(''));
        await dispatch(getHistoryOut(''));
        NavigationUtils.startMainAdminContent();
      } else {
        await dispatch(getMany(''));
        await dispatch(getAccount(''));
        await dispatch(getUserHistoryIn(''));
        await dispatch(getUserHistoryOut(''));
        await dispatch(userHistoryTransferIn(''));
        await dispatch(userHistoryTransferOut(''));
        NavigationUtils.startMainContent();
      }
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Life Begins After Coffee</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="email"
            ref={emailRef}
            defaultValue={formik.values.email}
            placeholder="Enter your email"
            onChangeText={formik.handleChange('email')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
            errorMessage={formik.errors.email}
            returnKeyType="next"
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            ref={passRef}
            defaultValue={formik.values.password}
            placeholder="Enter your password"
            onChangeText={formik.handleChange('password')}
            onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
            secureTextEntry={data.secureTextEntry ? true : false}
            errorMessage={formik.errors.password}
            returnKeyType="go"
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnForgot}
          onPress={() => {
            NavigationUtils.push({
              screen: 'ForgetPassword',
              title: 'ForgotPassword',
            });
          }}
        >
          <Text style={styles.textForgot}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <LinearGradient colors={['#f7e120', '#fcdb55']} style={styles.signIn}>
              <Text style={[styles.textSign, { color: 'black' }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateScreen('Register')} style={styles.signUp}>
            <Text style={[styles.textSign, { color: '#ffcc00' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      {/* {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null} */}
    </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUp: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 15,
  },
  textForgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  // loading: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(0,0,0,0.2)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
