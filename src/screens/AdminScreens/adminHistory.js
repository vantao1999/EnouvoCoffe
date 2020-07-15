import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  refreshLoading,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import { getHistoryIn, getHistoryOut } from '../../redux/TransactionRedux/operations';

const AdminHistory = () => {
  const dispatch = useDispatch();
  const historyIn = useSelector((state) => get(state, 'trans.listAdminHistoryIn', null));
  const historyOut = useSelector((state) => get(state, 'trans.listAdminHistoryOut', null));

  const addRefresh = async () => {
    await dispatch(getHistoryIn(''));
  };
  const AddMoney = () => (
    <View style={styles.scene}>
      <FlatList
        data={historyIn}
        renderItem={Plus}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={addRefresh} />}
      />
    </View>
  );

  const minusRefresh = async () => {
    await dispatch(getHistoryOut(''));
  };
  const MinusMoney = () => (
    <View style={styles.scene}>
      <FlatList
        data={historyOut}
        renderItem={Minus}
        refreshing={true}
        keyExtractor={(item) => item.username}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={minusRefresh} />}
      />
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Add Money' },
    { key: 'second', title: 'Minus Money' },
  ]);

  const renderScene = SceneMap({
    first: AddMoney,
    second: MinusMoney,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar}
      style={styles.tabView}
      renderLabel={({ route, focused }) => <Text style={styles.tabTitle}>{route.title}</Text>}
    />
  );

  const Plus = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Add money for {item.username}:</Text>
          <Text style={styles.textPayment}>+{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const Minus = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM DD, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Minus {item.username}'s account:</Text>
          <Text style={styles.textPayment}>-{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Images/coffee.jpg')}
          style={styles.imgBackground}
          resizeMode="contain"
        />
        <Text style={styles.textHeader}>HELLO ADMIN! HAVE A GOOD JOB!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.viewTitle}>
          <Text style={styles.textTitle}>HISTORY</Text>
          <Feather name="clock" size={20} color="#56aaff" />
        </TouchableOpacity>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
      {/* {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null} */}
    </View>
  );
};
export default AdminHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  header: {
    flex: 1,
    backgroundColor: '#ffcc00',
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: 'flex-start',
  },
  textHeader: {
    fontFamily: 'Roboto-bold',
    fontSize: 25,
    color: 'white',
    width: '55%',
  },
  imgBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  content: {
    flex: Platform.OS === 'android' ? 5 : 3,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scene: {
    flex: 1,
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTitle: {
    marginRight: 5,
    fontFamily: 'Roboto-bold',
    fontSize: 20,
  },
  tabView: {
    marginTop: 10,
    backgroundColor: '#ffcc00',
  },
  tabBar: {
    backgroundColor: '#000',
  },
  tabTitle: {
    fontFamily: 'Roboto',
    fontSize: 15,
    textAlign: 'center',
  },
  textDate: {
    marginTop: 20,
    marginLeft: 10,
    fontFamily: 'Roboto-bold',
    fontSize: 17,
  },

  historyContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textHistoryTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
  },
  textTitleNotes: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    color: '#56aaff',
  },
  textNotes: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    marginLeft: 5,
  },
  textPayment: {
    fontFamily: 'Roboto-regular',
    fontSize: 18,
    color: '#ff5656',
    marginLeft: 5,
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
