import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationUtils } from '../../navigation';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [userData, setData] = React.useState({});
  const account = useSelector((state) => get(state, 'auth.account', null));

  useEffect(() => {
    if (account) {
      setData(account);
    }
  }, [account]);

  const navigate = () => {
    NavigationUtils.push({
      screen: 'transferMoney',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInLeft">
        <Text style={styles.title}>Welcome Back!</Text>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.logo} />
      </Animatable.View>

      <Animatable.View style={styles.balance} animation="bounceInRight">
        <Text style={styles.textAccount}>Account Balance:</Text>
        <Text style={styles.textBalance}>{userData.accountBalance} VND</Text>
      </Animatable.View>

      <Animatable.View style={styles.footer} animation="fadeInUp" duration={700}>
        <Text style={styles.texFeature}>Features</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <TouchableOpacity onPress={navigate} style={styles.btnAction}>
              <Icon name="money" size={30} />
              <Text style={styles.textTransfer}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAction}>
              <Icon name="credit-card" size={30} />
              <Text style={styles.textTransfer}>Payment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  header: {
    opacity: 0.7,
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  balance: {
    opacity: 0.7,
    flex: 1,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAccount: {
    fontFamily: 'Roboto-regular',
  },
  textBalance: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
  },
  footer: {
    flex: 4,
    backgroundColor: '#f7f7f7',
    marginHorizontal: 20,
    marginTop: 10,
  },
  texFeature: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  action: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  btnAction: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffcc00',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e1e1e1',
    marginLeft: 10,
  },
  textTransfer: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});
