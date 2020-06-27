import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateOne, getMany } from '../../redux/AuthRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  // const userData = props.userData;
  const formik = useFormik({
    initialValues: {
      userId: props.userData.id,
      username: props.userData.username,
      address: props.userData.address || '',
      phone: props.userData.phone || '',
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const updateUser = async (values) => {
    const result = dispatch(updateOne(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Updated successfully');
        NavigationUtils.pop();
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err.error || 'Something was not incorrect, Please try again');
        }
      });
    const getUser = await dispatch(getMany(''));
    console.log('USerData', getUser);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.exit}>
          <TouchableOpacity
            onPress={() => {
              NavigationUtils.pop();
            }}
          >
            <Feather name="x" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.edit}>
          <TouchableOpacity
            onPress={() => {
              formik.handleSubmit();
            }}
          >
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.username}
              placeholder="Enter name"
              onChangeText={formik.handleChange('username')}
              autoFocus={true}
              returnKeyType="next"
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.address}
              placeholder="Enter address"
              onChangeText={formik.handleChange('address')}
              returnKeyType="next"
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone Number</Text>
            <TextInput
              style={styles.textContent}
              defaultValue={formik.values.phone}
              placeholder="Enter phone number"
              onChangeText={formik.handleChange('phone')}
              returnKeyType="go"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#ffcc00',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  footer: {
    flex: 2,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textContent: {
    paddingVertical: 5,
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 50,
  },
  exit: {
    position: 'absolute',
    left: 50,
    top: 50,
  },
  textSave: {
    fontFamily: 'Roboto-Regular',
    color: '#4ba0f4',
    fontSize: 17,
  },
});
