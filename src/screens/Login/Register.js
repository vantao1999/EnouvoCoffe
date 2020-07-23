/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationUtils } from '../../navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/UserRedux/operations';
// import { values } from 'lodash';

const TEXT_INPUT_USERNAME = 'TEXT_INPUT_USERNAME';
const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Register = () => {
  const [DATA, setData] = React.useState({
    email: '',
    emailErr: '',
    secureTextEntry: true,
  });
  const showSecureTextEntry = () => {
    setData({
      ...DATA,
      secureTextEntry: !DATA.secureTextEntry,
    });
  };

  const dispatch = useDispatch();

  let usernameRef = useRef(null);
  let emailRef = useRef(null);
  let passRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email required'),
      username: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at less 6 character')
        .max(20, 'Max length is 20 characters')
        .required('Required'),
    }),
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = async ({ email, username, password }) => {
    Keyboard.dismiss();
    const data = { email, username, password };
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      NavigationUtils.startLoginContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };

  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_EMAIL) {
      usernameRef.current?.focus();
    }
    if (field === TEXT_INPUT_USERNAME) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
          <Text style={[styles.text_footer, { marginTop: 15 }]}>Email</Text>
          <View style={styles.action}>
            <Feather name="mail" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              type="email"
              ref={emailRef}
              value={formik.values.email}
              placeholder="Your email"
              onChangeText={formik.handleChange('email')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
              onBlur={formik.handleBlur('email')}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.mesValidate}>{formik.touched.email && formik.errors.email}</Text>

          <Text style={styles.text_footer}>User Name</Text>
          <View style={styles.action}>
            <Feather name="user" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={usernameRef}
              value={formik.values.username}
              placeholder="Full name"
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_USERNAME)}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              maxLength={71}
              returnKeyType="next"
            />
          </View>
          <Text style={styles.mesValidate}>
            {formik.touched.username && formik.errors.username}
          </Text>

          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={passRef}
              value={formik.values.password}
              placeholder="Your password"
              secureTextEntry={DATA.secureTextEntry ? true : false}
              onBlur={formik.handleBlur('password')}
              maxLength={21}
              returnKeyType="next"
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
              onChangeText={formik.handleChange('password')}
            />
            <TouchableOpacity onPress={showSecureTextEntry}>
              {DATA.secureTextEntry ? (
                <Feather name="eye-off" color="#05375a" size={20} />
              ) : (
                <Feather name="eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.mesValidate}>
            {formik.touched.password && formik.errors.password}
          </Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <LinearGradient colors={['#fcdb55', '#f7e188']} style={styles.signIn}>
                <Text style={[styles.textSign, { color: 'black' }]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => NavigationUtils.pop()} style={styles.signUp}>
              <Text style={[styles.textSign, { color: '#ffcc00' }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Animatable.View>
    </View>
  );
};
export default Register;
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : null,
    color: '#05375a',
  },
  button: {
    marginTop: Platform.OS === 'ios' ? 50 : 10,
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
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  mesValidate: {
    color: 'red',
  },
});
