import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  refreshLoading,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';
import {
  userHistoryTransferOut,
  userHistoryTransferIn,
  getUserHistoryIn,
  getUserHistoryOut,
} from '../../redux/TransactionRedux/operations';

const History = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => get(state, 'trans.loading', null));

  console.log('LOADING', loading);
  const userHistoryIn = useSelector((state) => get(state, 'trans.listHistoryTransactionIn', null));
  const userHistoryOut = useSelector((state) =>
    get(state, 'trans.listHistoryTransactionOut', null),
  );
  const getUserHistoryTransferIn = useSelector((state) =>
    get(state, 'trans.listHistoryTransferIn', null),
  );
  const getUserHistoryTransferOut = useSelector((state) =>
    get(state, 'trans.listHistoryTransfer', null),
  );
  const FirstRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={userHistoryIn}
        renderItem={In}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={refresh} />}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <FlatList data={userHistoryOut} renderItem={Out} keyExtractor={(item) => item.id} />
    </View>
  );

  const ThirdRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={getUserHistoryTransferIn}
        renderItem={Received}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  const FourthRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={getUserHistoryTransferOut}
        renderItem={TransferOut}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Money In' },
    { key: 'second', title: 'Money Out' },
    { key: 'third', title: 'Receive' },
    { key: 'fourth', title: 'Transfer' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar}
      style={styles.tabView}
      renderLabel={({ route, focused }) => <Text style={styles.tabTitle}>{route.title}</Text>}
    />
  );

  const In = ({ item }) => (
    <View>
      <Text style={styles.textDate}>
        Date: {moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}
      </Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Enouvo Cafe plus money:</Text>
          <Text style={styles.textPayment}>+{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const Out = ({ item }) => (
    <View>
      <Text style={styles.textDate}>
        Date: {moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}
      </Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Enouvo Cafe minus:</Text>
          <Text style={styles.textPayment}>{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const Received = ({ item }) => (
    <View>
      <Text style={styles.textDate}>
        Date: {moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}
      </Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>{item.username} has transferred to you:</Text>
          <Text style={styles.textPayment}>+{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );
  const TransferOut = ({ item }) => (
    <View>
      <Text style={styles.textDate}>
        Date: {moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}
      </Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>You has transferred to {item.username}:</Text>
          <Text style={styles.textPayment}>{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const refresh = async () => {
    await dispatch(getUserHistoryIn(''));
    await dispatch(getUserHistoryOut(''));
    await dispatch(userHistoryTransferIn(''));
    await dispatch(userHistoryTransferOut(''));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Images/coffee.jpg')}
          style={styles.imgBackground}
          resizeMode="contain"
        />
        <Text style={styles.textHeader}>THINK BIG START SMALL MOVE FAST!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.viewTitle} onPress={refresh}>
          <Text style={styles.textTitle}>HISTORY</Text>
          <Feather name="clock" size={20} color="#56aaff" />
        </TouchableOpacity>
        {loading ? <ActivityIndicator size="small" color="#ffcc00" /> : null}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};
export default History;
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
    width: '50%',
  },
  imgBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  content: {
    flex: 3,
    marginTop: 30,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
});
