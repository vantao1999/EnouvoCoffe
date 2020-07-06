/* eslint-react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { NavigationUtils } from '../../navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getMany } from '../../redux/UserRedux/operations';
import { minusMoney, getHistoryOut } from '../../redux/TransactionRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const MinusMoney = (props) => {
  const dispatch = useDispatch();
  const errMessage = useSelector((state) => state.trans.errMessage);

  const formik = useFormik({
    initialValues: {
      userId: props.userData.id,
      payment: '',
      notes: '',
    },
    onSubmit: (values) => {
      minusUserMoney(values);
    },
  });

  const minusUserMoney = async (values) => {
    const result = dispatch(minusMoney(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Minus successfully');
        NavigationUtils.push({
          screen: 'Admin',
          isTopBarEnable: false,
          isBottomTabsEnable: true,
        });
      })
      .catch((error) => {
        if (result.payload) {
          Alert.alert('Error', result.errMessage || 'error');
        } else {
          Alert.alert('Error', errMessage || 'Something was not incorrect, Please try again');
        }
      });
    await dispatch(getMany(''));
    await dispatch(getHistoryOut(''));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <View />
        <Text style={styles.textName}>{props.userData.username}</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <TextInput
              style={styles.textContent}
              value={formik.values.payment}
              placeholder="Enter money"
              onChangeText={formik.handleChange('payment')}
              keyboardType="decimal-pad"
              maxLength={8}
              autoFocus={true}
              returnKeyType="next"
            />
            <Text style={styles.currency}>VND</Text>
          </View>

          <View style={styles.action}>
            <TextInput
              style={styles.textContent}
              Value={formik.values.notes}
              placeholder="Description..."
              onChangeText={formik.handleChange('notes')}
              maxLength={160}
              autoCorrect={false}
              returnKeyType="go"
            />
          </View>
          <View style={styles.action}>
            <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
              style={styles.btnPlus}
            >
              <Text style={styles.textTransfer}>- Minus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MinusMoney;
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
  textName: {
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  footer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  action: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#ffcc00',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  btnPlus: {
    flex: 1,
    backgroundColor: '#ff8282',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTransfer: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    color: 'white',
  },
});
