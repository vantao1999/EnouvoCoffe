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
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getMany } from '../../redux/UserRedux/operations';
import { plusMoney, getHistoryIn } from '../../redux/TransactionRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';
import NumberFormat from 'react-number-format';

const AddMoney = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => get(state, 'trans.plusLoading', null));
  const formik = useFormik({
    initialValues: {
      userId: props.item.id,
      payment: '',
      notes: '',
      type: 'plus',
    },
    validationSchema: Yup.object({
      payment: Yup.string().min(4, 'At least 1000 vnd').required('Can not be null'),
      notes: Yup.string().max(44, 'Too long'),
    }),
    onSubmit: (values) => {
      let data = {
        userId: values.userId,
        payment: parseInt(values.payment.replace(',', ''), 10),
        notes: values.notes,
        type: values.type,
      };
      plusUserMoney(data);
    },
  });

  const reLoad = async () => {
    await dispatch(getMany(''));
    await dispatch(getHistoryIn(''));
  };
  const plusUserMoney = async (values) => {
    const result = dispatch(plusMoney(values))
      .then(unwrapResult)
      .then((success) => {
        Alert.alert('Add money successfully');
        reLoad();
        NavigationUtils.popToRoot();
      })
      .catch((err) => {
        if (result.payload) {
          Alert.alert('Error', err.payload.message || 'error');
        } else {
          Alert.alert('Error', err.error || 'Something was not incorrect, Please try again');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {props.item.avatar ? (
          <Image source={{ uri: props.item.avatar }} style={styles.imageUser} />
        ) : (
          <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        )}
        <Text style={styles.textName}>{props.item.username}</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <NumberFormat
              value={formik.values.payment}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => (
                <TextInput
                  style={styles.textContent}
                  onChangeText={formik.handleChange('payment')}
                  onBlur={formik.handleBlur('payment')}
                  value={value}
                  maxLength={11}
                  placeholder="Enter money"
                  keyboardType="number-pad"
                />
              )}
            />
            <Text style={styles.currency}>VND</Text>
          </View>
          <Text style={styles.mesValidate}>{formik.touched.payment && formik.errors.payment}</Text>

          <View style={styles.action}>
            <TextInput
              style={styles.textContent}
              Value={formik.values.notes}
              placeholder="Description..."
              onChangeText={formik.handleChange('notes')}
              maxLength={45}
              autoCorrect={false}
              returnKeyType="go"
            />
            <Text style={styles.currency}>(45)</Text>
          </View>
          <Text style={styles.mesValidate}>{formik.touched.notes && formik.errors.notes}</Text>
          <View style={styles.action}>
            <TouchableOpacity
              onPress={() => {
                // console.log(formik.values);
                formik.handleSubmit();
              }}
              style={styles.btnPlus}
            >
              <Text style={styles.textTransfer}>Plus (+)</Text>
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

export default AddMoney;
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
  btnPlus: {
    flex: 1,
    backgroundColor: '#00d600',
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
  mesValidate: {
    color: 'red',
  },
});
