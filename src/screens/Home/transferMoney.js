import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationUtils } from '../../navigation';
import Feather from 'react-native-vector-icons/Feather';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { getOne, getMany } from '../../redux/UserRedux/operations';

const TransferMoney = () => {
  const dispatch = useDispatch();
  const { id: currentUserId } = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => get(state, 'auth.listUser', null));

  const getUserData = async (userId) => {
    await dispatch(getMany(''));
    const result = await dispatch(getOne(userId));
    console.log('USER GET ID', result);
    if (getOne.fulfilled.match(result)) {
      const userData = unwrapResult(result);
      console.log('UNWRAP RESULT ', userData);

      if (userData) {
        NavigationUtils.push({
          screen: 'userTransfer',
          title: 'Transfer to EnouvoCafe Wallet',
          passProps: { userData },
        });
      }
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        getUserData(item.id);
      }}
    >
      <View style={styles.viewUser}>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <View style={styles.viewIn}>
          <Text style={styles.userTitle}>{item.username}</Text>
        </View>
        <View style={styles.btnViewUser} />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSearch}>
        <TextInput style={styles.searchBar} placeholder="Search by username or email" />
        <TouchableOpacity style={styles.btnSearch}>
          <Feather name="search" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <Text style={styles.textUser}>Recent Contact</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userInfo.filter((item) => item.id !== currentUserId)}
        renderItem={Item}
        keyExtractor={(item) => item.email}
      />
    </SafeAreaView>
  );
};
export default TransferMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  viewSearch: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  searchBar: {
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  btnSearch: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  action: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  viewUser: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  viewIn: {
    flex: 1,
    marginLeft: 20,
  },
  userTitle: {
    fontFamily: 'Roboto-bold',
    fontSize: 17,
  },
  textUser: {
    fontFamily: 'Roboto-bold',
    fontSize: 18,
  },
});
