/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/UserRedux/operations';
import * as Yup from 'yup';

const VerifyCode = () => {
  const [data, setData] = React.useState({
    secureTextEntry: true,
  });

  const showSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      code: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().min(6, 'Invalid code').required('Code is required'),
      newPassword: Yup.string()
        .min(6, 'At least 6 characters')
        .max(20, 'Max length is 20 characters'),
    }),
    onSubmit: (values) => {
      resetNewpassword(values);
    },
  });
  const resetNewpassword = async ({ code, newPassword }) => {
    Keyboard.dismiss();
    const result = await dispatch(resetPassword({ code, newPassword }));

    if (resetPassword.fulfilled.match(result)) {
      NavigationUtils.startLoginContent();
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.notice}>
        <Text style={{ fontFamily: 'Roboto' }}>
          We have sent a verify code include 6 numbers to your email entered, Please check your
          email and fill in to the form
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.textForgot}> Verify Code</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="code"
            placeholder="Enter code here"
            keyboardType="numeric"
            Value={formik.values.code}
            onChangeText={formik.handleChange('code')}
            onBlur={formik.handleBlur('code')}
            maxLength={7}
            returnKeyType="next"
          />
        </View>
        <Text style={styles.mesValidate}>{formik.touched.code && formik.errors.code}</Text>

        <Text style={styles.textPass}>New Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="newPassword"
            placeholder="Enter your password"
            secureTextEntry={data.secureTextEntry ? true : false}
            Value={formik.values.newPassword}
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            maxLength={21}
            returnKeyType="go"
          />
          <TouchableOpacity onPress={showSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.mesValidate}>
          {formik.touched.newPassword && formik.errors.newPassword}
        </Text>
      </View>
      <TouchableOpacity style={styles.btnSubmit} onPress={formik.handleSubmit}>
        <Text style={styles.textSend}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default VerifyCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notice: {
    marginHorizontal: 20,
  },
  content: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  textForgot: {
    fontSize: 20,
    fontFamily: 'Roboto-regular',
  },
  action: {
    marginTop: 20,
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
    paddingLeft: 10,
  },
  btnSubmit: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textPass: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Roboto-regular',
  },
  textSend: {
    fontSize: 20,
    fontFamily: 'Roboto-bold',
  },
  mesValidate: {
    color: 'red',
  },
});
