import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationUtils } from '../../navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { getMany, getAccount } from '../../redux/UserRedux/operations';
import { userHistoryTransferOut, transferMoney } from '../../redux/TransactionRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const UserTransfer = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userId: props.userData.id,
      payment: '',
      notes: '',
    },
    onSubmit: (values) => {
      usertransferMoney(values);
    },
  });

  const usertransferMoney = async (values) => {
    const result = dispatch(transferMoney(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Transfer successfully');
        NavigationUtils.startMainContent();
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err.error || 'Something was not incorrect, Please try again');
        }
      });
    await dispatch(getMany(''));
    await dispatch(getAccount(''));
    await dispatch(userHistoryTransferOut(''));
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
              placeholder="Enter message to ..."
              onChangeText={formik.handleChange('notes')}
              maxLength={160}
              autoCorrect={false}
              returnKeyType="go"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              formik.handleSubmit();
            }}
            style={styles.btnTransfer}
          >
            <Text style={styles.textTransfer}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default UserTransfer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    flex: 1,
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
  btnTransfer: {
    backgroundColor: '#ffcc00',
    marginTop: 30,
    paddingVertical: 5,
    marginHorizontal: 100,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  textTransfer: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
  },
});
