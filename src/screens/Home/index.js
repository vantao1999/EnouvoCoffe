import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationUtils } from '../../navigation';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaskService } from 'react-native-masked-text';

const Home = () => {
  const [userData, setData] = React.useState({
    userName: '',
  });
  const account = useSelector((state) => get(state, 'auth.account', null));
  const user = useSelector((state) => get(state, 'auth.user', null));

  // useEffect(() => {
  //   if (account) {
  //     setData(account);
  //   }
  // }, [account]);

  const navigate = () => {
    NavigationUtils.push({
      screen: 'transferMoney',
      isTopBarEnable: false,
    });
  };
  const qrCode = () => {
    NavigationUtils.push({
      screen: 'QRcode',
      isTopBarEnable: false,
    });
  };
  useEffect(() => {
    if (user) {
      setData({
        userName: user.username.trim().split(' '),
      });
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInLeft">
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.title}>{userData.userName[userData.userName.length - 1]}</Text>
        </View>
        <Image source={require('../../assets/Images/user.jpeg')} style={styles.logo} />
      </Animatable.View>

      <Animatable.View style={styles.balance} animation="bounceInRight">
        <Text style={styles.textAccount}>Account Balance:</Text>
        <Text style={styles.textBalance}>
          {MaskService.toMask('money', account.accountBalance, {
            unit: '',
            precision: 0,
            delimiter: '.',
          })}{' '}
          VND
        </Text>
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
            <TouchableOpacity style={styles.btnAction}>
              <Icon name="qrcode" size={30} />
              <Text style={styles.textTransfer} onPress={qrCode}>
                QR Code
              </Text>
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
    marginTop: Platform.OS === 'android' ? 10 : null,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
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
    fontSize: 25,
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
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  btnAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffcc00',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e1e1e1',
  },
  textTransfer: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});
