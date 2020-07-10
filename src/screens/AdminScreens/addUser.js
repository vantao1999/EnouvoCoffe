/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationUtils } from '../../navigation';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createOne } from '../../redux/UserRedux/operations';
import { getMany } from '../../redux/UserRedux/operations';

const TEXT_INPUT_USERNAME = 'TEXT_INPUT_USERNAME';
const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const AddUser = () => {
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
    onSubmit: (values) => {
      handleAddUser(values);
    },
  });

  const reLoad = async () => {
    await dispatch(getMany(''));
  };

  const handleAddUser = async ({ email, username, password }) => {
    Keyboard.dismiss();
    const data = { email, username, password };

    const result = await dispatch(createOne(data));
    if (createOne.fulfilled.match(result)) {
      Alert.alert('Add successful');
      reLoad();
      NavigationUtils.pop();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Add User!</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={500}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Email</Text>
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
              errorMessage={formik.errors.email}
              returnKeyType="next"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>User Name</Text>
          <View style={styles.action}>
            <Feather name="user" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={usernameRef}
              value={formik.values.username}
              placeholder="Full name"
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_USERNAME)}
              onChangeText={formik.handleChange('username')}
              errorMessage={formik.errors.username}
              returnKeyType="next"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={passRef}
              value={formik.values.password}
              placeholder="Your password"
              secureTextEntry={DATA.secureTextEntry ? true : false}
              errorMessage={formik.errors.password}
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
          <View style={styles.button}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <LinearGradient colors={['#fcdb55', '#f7e188']} style={styles.signIn}>
                <Text style={[styles.textSign, { color: 'black' }]}>Add</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
export default AddUser;
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
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
