/* eslint-react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NavigationUtils } from '../../navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getMany } from '../../redux/UserRedux/operations';
import { minusMoney, getHistoryOut } from '../../redux/TransactionRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';

const MinusMoney = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => get(state, 'trans.loading', null));
  const errMessage = useSelector((state) => state.trans.errMessage);

  const formik = useFormik({
    initialValues: {
      userId: props.item.id,
      payment: '',
      notes: '',
    },
    onSubmit: (values) => {
      minusUserMoney(values);
    },
  });

  const reLoad = async () => {
    await dispatch(getMany(''));
    await dispatch(getHistoryOut(''));
  };

  const minusUserMoney = async (values) => {
    const result = dispatch(minusMoney(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Minus successfully');
        reLoad();
        NavigationUtils.popToRoot();
      })
      .catch((error) => {
        if (result.payload) {
          Alert.alert('Error', result.errMessage || 'error');
        } else {
          Alert.alert('Error', errMessage || 'Something was not incorrect, Please try again');
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <View />
        <Text style={styles.textName}>{props.item.username}</Text>
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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null}
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
