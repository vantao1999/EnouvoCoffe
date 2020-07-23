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
import { forgotPassword } from '../../redux/UserRedux/operations';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email type').required('Email is required'),
    }),
    onSubmit: (values) => {
      handleForgotPassword(values);
    },
  });
  const handleForgotPassword = async ({ email }) => {
    Keyboard.dismiss();
    const result = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(result)) {
      NavigationUtils.push({ screen: 'VerifyCode' });
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
      <View style={styles.content}>
        <Text style={styles.textForgot}> ForgotPassword ?</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            style={styles.textInput}
            type="email"
            placeholder="Enter your email"
            Value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            returnKeyType="go"
          />
        </View>
        <Text style={styles.mesValidate}>{formik.touched.email && formik.errors.email}</Text>
      </View>
      <TouchableOpacity style={styles.btnSend} onPress={formik.handleSubmit}>
        <Text style={styles.textSend}>Send Email</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  textForgot: {
    fontSize: 20,
  },
  action: {
    marginTop: 20,
    flexDirection: 'row',
  },
  textInput: {
    width: '80%',
    paddingLeft: 10,
  },
  btnSend: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textSend: {
    fontSize: 20,
  },
  mesValidate: {
    color: 'red',
  },
});
