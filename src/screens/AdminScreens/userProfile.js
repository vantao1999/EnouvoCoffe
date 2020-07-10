/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { NavigationUtils } from '../../navigation';
import { disable } from '../../redux/UserRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { updateOne, getMany } from '../../redux/UserRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const UserProfile = (props) => {
  const getManyLoading = useSelector((state) => get(state, 'auth.getManyLoading', null));
  const [userInfo, setData] = React.useState({
    isEdit: false,
  });
  const dispatch = useDispatch();
  const disableUser = async (userId) => {
    const result = await dispatch(disable(userId));
  };

  const formik = useFormik({
    initialValues: {
      userId: props.item.id,
      username: props.item.username,
      address: props.item.address || '',
      phone: props.item.phone || '',
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const reLoad = async () => {
    await dispatch(getMany(''));
  };
  const updateUser = async (values) => {
    const result = dispatch(updateOne(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Updated successfully');
        reLoad();
        NavigationUtils.popToRoot();
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err || 'Something was not incorrect, Please try again');
        }
      });
  };

  const navigateToPlus = (item) => {
    NavigationUtils.push({
      screen: 'plusMoney',
      isTopBarEnable: false,
      passProps: { item },
    });
  };
  const navigateToMinus = (item) => {
    NavigationUtils.push({
      screen: 'minusMoney',
      isTopBarEnable: false,
      passProps: { item },
    });
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
                disableUser(props.item.id);
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
        <Text style={styles.textBalance}>{props.item.accountBalance} VND</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <Text style={styles.textTitle}>Name</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.item.username}
              editable={userInfo.isEdit}
              placeholder="Enter name"
              autoFocus={true}
              onChangeText={formik.handleChange('username')}
              returnKeyType="next"
            />
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Email</Text>
            <Text style={styles.textContent}>{props.item.email}</Text>
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Address</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.item.address}
              editable={userInfo.isEdit}
              placeholder="Enter address"
              onChangeText={formik.handleChange('address')}
              returnKeyType="next"
            />
          </View>

          <View style={styles.action}>
            <Text style={styles.textTitle}>Phone</Text>
            <TextInput
              style={userInfo.isEdit ? styles.textEditContent : styles.textContent}
              defaultValue={props.item.phone}
              editable={userInfo.isEdit}
              placeholder="Enter phone"
              keyboardType="numeric"
              onChangeText={formik.handleChange('phone')}
              returnKeyType="next"
            />
          </View>
          <View style={styles.btnAction}>
            <TouchableOpacity
              onPress={() => {
                navigateToPlus(props.item);
              }}
              style={styles.btnPlus}
            >
              <Text style={styles.textTransfer}>+ Plus Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigateToMinus(props.item);
              }}
              style={[styles.btnPlus, { backgroundColor: '#ff8282' }]}
            >
              <Text style={styles.textTransfer}>- Minus Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {getManyLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null}
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
  btnAction: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlus: {
    flex: 1,
    backgroundColor: '#4ba0f4',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  textTransfer: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    color: 'white',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
