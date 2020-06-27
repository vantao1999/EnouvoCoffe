import React from 'react';
import { View, Text, Alert, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import { useFormik } from 'formik';
import { NavigationUtils } from '../../navigation';
import { disable } from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import { updateOne, getMany } from '../../redux/AuthRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const UserProfile = (props) => {
  const [userInfo, setData] = React.useState({
    username: '',
    address: '',
    phone: '',
    isEdit: false,
  });
  const dispatch = useDispatch();
  const disableUser = async (userId) => {
    const result = await dispatch(disable(userId));
  };

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
        NavigationUtils.push({
          screen: 'Admin',
          isTopBarEnable: false,
          isBottomTabsEnable: true,
        });
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
        <View style={styles.deleted}>
          {userInfo.isEdit ? (
            <TouchableOpacity onPress={() => setData({ ...userInfo, isEdit: !userInfo.isEdit })}>
              <Feather name="x" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                disableUser(props.userData.id);
              }}
            >
              <Feather name="trash-2" size={20} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.edit}>
          {userInfo.isEdit ? (
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setData({ ...userInfo, isEdit: !userInfo.isEdit })}>
              <Feather name="edit" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <Text style={styles.textBalance}>Balance: 750.000 VND</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.userData.username}
              editable={userInfo.isEdit}
              placeholder="Enter name"
              onChangeText={formik.handleChange('username')}
              returnKeyType="next"
            />
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Email</Text>
            <Text style={styles.textContent}>{props.userData.email}</Text>
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.userData.address}
              editable={userInfo.isEdit}
              placeholder="Enter name"
              onChangeText={formik.handleChange('address')}
              returnKeyType="next"
            />
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.userData.phone}
              editable={userInfo.isEdit}
              placeholder="Enter name"
              onChangeText={formik.handleChange('phone')}
              returnKeyType="next"
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
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  footer: {
    flex: 3,
  },
  action: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textContent: {
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'Roboto',
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 10,
  },
  deleted: {
    position: 'absolute',
    left: 50,
    top: 10,
  },
  textBalance: {
    marginTop: 15,
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: '#4ba0f4',
  },
  // Styles for TextInput
  textSave: {
    fontFamily: 'Roboto-Regular',
    color: '#4ba0f4',
    fontSize: 20,
  },
  textEditContent: {
    fontSize: 22,
    marginTop: 5,
    fontFamily: 'Roboto',
  },
});
