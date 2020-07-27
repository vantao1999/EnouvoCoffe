/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationUtils } from '../../navigation';
import { useSelector, useDispatch } from 'react-redux';
import { get, includes, toLower } from 'lodash';
import { getMany } from '../../redux/UserRedux/operations';
import NumberFormat from 'react-number-format';

const Index = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchTxt, setSearchTxt] = React.useState('');
  const [userData, setUserData] = useState([]);
  const userInfo = useSelector((state) => get(state, 'auth.listUser', null));

  const onRefresh = async () => {
    await dispatch(getMany(''));
    setRefreshing(true);
  };

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
      setRefreshing(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (searchTxt) {
      const temp = userInfo.filter((i) => includes(toLower(i.username), toLower(searchTxt)));
      setUserData(temp);
    } else {
      setUserData(userInfo);
    }
  }, [searchTxt]);

  const navigateAdduser = () => {
    NavigationUtils.push({
      screen: 'addUser',
      title: 'Add A New User',
    });
  };

  const getUserData = async (item) => {
    NavigationUtils.push({
      screen: 'userProfile',
      title: 'User Profile Details',
      passProps: { item },
    });
  };
  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        getUserData(item);
      }}
    >
      <View style={styles.viewUser}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.imageUser} />
        ) : (
          <Image source={require('../../assets/Images/user.jpeg')} style={styles.imageUser} />
        )}
        <View style={styles.viewIn}>
          <Text style={styles.userTitle}>{item.username}</Text>
          <Text style={styles.userBalance}>
            <NumberFormat
              value={item.accountBalance}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            VND
          </Text>
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
      </View>
      <View style={styles.footer}>
        <View style={styles.viewSearch}>
          <Feather name="search" size={20} />
          <TextInput
            style={styles.searchBar}
            placeholder=" Search by username"
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
          keyExtractor={(item, index) => `${index}`}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textIncome: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  footer: {
    flex: 3,
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
    paddingVertical: 5,
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
    paddingVertical: 5,
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
    borderRadius: 30,
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
