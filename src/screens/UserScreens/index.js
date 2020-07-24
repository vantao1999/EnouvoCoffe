import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationUtils } from '../../navigation';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { updateProfile, logOut } from '../../redux/UserRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';
import * as Yup from 'yup';

const Index = () => {
  const [userData, setData] = React.useState({
    isEdit: false,
  });
  const [imgAvatar, setAvatar] = React.useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => get(state, 'auth.user', null));
  const avatar = useSelector((state) => get(state, 'auth.avatar', null));
  console.log('User', avatar);

  useEffect(() => {
    if (avatar) {
      setAvatar(avatar);
    }
  }, [avatar]);
  useEffect(() => {
    if (user) {
      setData((data) => ({ ...data, ...user }));
    }
  }, [user]);

  const LogOut = async () => {
    await dispatch(logOut());
    NavigationUtils.startLoginContent();
  };

  const formik = useFormik({
    initialValues: {
      username: userData.username,
      address: userData.address,
      phone: userData.phone,
    },
    validationSchema: Yup.object({
      phone: Yup.string().min(10, 'At least 10 characters'),
    }),
    onSubmit: (values) => {
      userUpdateProfile(values);
    },
  });
  const userUpdateProfile = async ({ username, address, phone }) => {
    Keyboard.dismiss();
    const result = await dispatch(updateProfile({ username, address, phone }))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Updated successfully');
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err.error || 'error');
        }
      });
  };
  const navigate = () => {
    NavigationUtils.push({
      screen: 'UploadImage',
      isTopBarEnable: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deleted}>
          {userData.isEdit ? (
            <TouchableOpacity onPress={() => setData({ ...userData, isEdit: !userData.isEdit })}>
              <Feather name="x" size={20} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.edit}>
          {userData.isEdit ? (
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setData({ ...userData, isEdit: !userData.isEdit })}>
              <Feather name="edit" size={20} />
            </TouchableOpacity>
          )}
        </View>
        {userData.isEdit ? (
          <TouchableOpacity onPress={navigate}>
            {imgAvatar ? (
              <Image source={{ uri: imgAvatar }} style={styles.imageUser} />
            ) : (
              <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
            )}
          </TouchableOpacity>
        ) : (
          <View onPress={navigate}>
            {imgAvatar ? (
              <Image source={{ uri: imgAvatar }} style={styles.imageUser} />
            ) : (
              <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
            )}
          </View>
        )}
        {!userData.isEdit ? (
          <TouchableOpacity style={styles.btnLogout} onPress={LogOut}>
            <Text style={styles.textLogout}>LogOut</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.footer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footer}>
            <View style={styles.action}>
              <Text style={styles.textTitle}>Name</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.username}
                editable={userData.isEdit}
                placeholder="Enter name"
                onChangeText={formik.handleChange('username')}
                returnKeyType="next"
              />
            </View>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Email</Text>
              <Text style={styles.textContent}>{userData.email}</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Address</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.address}
                editable={userData.isEdit}
                placeholder="Enter address"
                onChangeText={formik.handleChange('address')}
                returnKeyType="next"
              />
            </View>

            <View style={styles.action}>
              <Text style={styles.textTitle}>Phone</Text>
              <TextInput
                style={userData.isEdit ? styles.textEditContent : styles.textContent}
                defaultValue={userData.phone}
                editable={userData.isEdit}
                placeholder="Enter phone"
                onChangeText={formik.handleChange('phone')}
                onBlur={formik.handleBlur('phone')}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType="next"
              />
              <Text style={styles.mesValidate}>{formik.touched.phone && formik.errors.phone}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
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
  btnLogout: {
    marginTop: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  textLogout: {
    fontFamily: 'Roboto-bold',
    fontSize: 18,
  },
  action: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1.5,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textContent: {
    fontSize: 20,
    paddingVertical: 5,
    fontFamily: 'Roboto',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: Platform.OS === 'android' ? '#000' : null,
  },
  edit: {
    position: 'absolute',
    right: 50,
    top: 50,
    flexDirection: 'row',
  },
  textEditContent: {
    fontSize: 22,
    fontFamily: 'Roboto',
    paddingVertical: 5,
  },
  textSave: {
    fontFamily: 'Roboto-Regular',
    color: '#4ba0f4',
    fontSize: 20,
  },
  deleted: {
    position: 'absolute',
    left: 50,
    top: 50,
  },
  mesValidate: {
    color: 'red',
  },
});
