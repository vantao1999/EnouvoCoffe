import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import { get, includes, toLower } from 'lodash';
import { getOne } from '../../redux/UserRedux/operations';
import { unwrapResult } from '@reduxjs/toolkit';

const Index = () => {
  const [searchTxt, setSearchTxt] = React.useState('');
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => get(state, 'auth.listUser', null));
  console.log('LISTUSEr', userInfo);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (searchTxt) {
      const temp = userInfo.filter((i) => includes(toLower(i.username), toLower(searchTxt)));
      setUserData(temp);
    } else {
      setUserData(userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTxt]);

  const navigateAdduser = () => {
    NavigationUtils.push({
      screen: 'addUser',
      title: 'Add A New User',
    });
  };

  const getUserData = async (item) => {
    // const result = await dispatch(getOne(userId));
    // if (getOne.fulfilled.match(result)) {
    //   const data = unwrapResult(result);

    //   if (data) {
    NavigationUtils.push({
      screen: 'userProfile',
      title: 'User Profile Details',
      passProps: { item },
    });
    //   }
    // } else {
    //   if (result.payload) {
    //     Alert.alert('Error', result.payload.message || 'error');
    //   } else {
    //     Alert.alert('Error', result.error || 'error');
    //   }
    // }
  };
  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        getUserData(item);
      }}
    >
      <View style={styles.viewUser}>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        <View style={styles.viewIn}>
          <Text style={styles.userTitle}>{item.username}</Text>
          <Text style={styles.userBalance}>{item.accountBalance}</Text>
        </View>
        <View style={styles.btnViewUser}>
          <Text>Details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.imageHeader}
          source={require('../../assets/Images/cashGif.gif')}
          resizeMode={'stretch'}
        />
        <Text style={styles.textIncome}> INCOME IN THIS WEEK: </Text>
        <View style={styles.viewBalance}>
          <Text style={styles.textBalance}>+ 2.560.000 VND</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.viewSearch}>
          <Feather name="search" size={20} />
          <TextInput
            style={styles.searchBar}
            placeholder=" Search by username or email"
            value={searchTxt}
            autoCorrect={false}
            onChangeText={(text) => {
              setSearchTxt(text);
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.textUser}>Recent Contact</Text>
          <TouchableOpacity style={styles.addUser} onPress={navigateAdduser}>
            <Feather name="plus" size={16} color="#ffffff" />
            <Text style={styles.textCreate}>Add a user</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userData.filter((item) => item.roleId !== 1)}
          renderItem={Item}
          keyExtractor={(item) => item.username}
        />
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textIncome: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  footer: {
    flex: 2,
  },
  viewBalance: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  textBalance: {
    fontFamily: 'Roboto-bold',
    fontSize: 40,
    color: '#eabb00',
  },
  imageHeader: {
    position: 'absolute',
  },
  viewSearch: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: '#7f7f7f',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    paddingVertical: 10,
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  textUser: {
    flex: 1,
    fontFamily: 'Roboto-bold',
    fontSize: 18,
  },
  addUser: {
    flexDirection: 'row',
    backgroundColor: '#2eaa6a',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 15,
  },
  textCreate: {
    fontFamily: 'Roboto',
    color: 'white',
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
  btnViewUser: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: '#ffcc00',
  },
});
