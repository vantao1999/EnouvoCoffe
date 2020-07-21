import React, { useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  refreshLoading,
  Platform,
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
import _ from 'lodash';

const History = () => {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => get(state, 'trans.loading', null));
  const userHistoryIn = useSelector((state) => get(state, 'trans.listHistoryTransactionIn', null));
  const userHistoryOut = useSelector((state) =>
    get(state, 'trans.listHistoryTransactionOut', null),
  );
  const getUserHistoryTransferIn = useSelector((state) =>
    get(state, 'trans.listHistoryTransferIn', null),
  );
  console.log('listHistoryTransferIn', getUserHistoryTransferIn);

  const getUserHistoryTransferOut = useSelector((state) =>
    get(state, 'trans.listHistoryTransferOut', null),
  );
  const historyTransferIn = useSelector((state) => get(state, 'trans.historyData', null));
  console.log('historyTransferIn', historyTransferIn);

  const [page, setPage] = React.useState(1);

  const handleLoadMore = async () => {
    if (historyTransferIn.current_page <= historyTransferIn.page_count) {
      await setPage(page + 1);
      let temPage = page + 1;
      await dispatch(userHistoryTransferIn({ page: temPage }));
    }
  };

  const MoneyInReload = async () => {
    await dispatch(getUserHistoryIn(''));
  };

  const MoneyInRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={_.orderBy(userHistoryIn, ['createdAt'], ['desc'])}
        renderItem={MoneyIn}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={MoneyInReload} />}
      />
    </View>
  );

  const MoneyOutReload = async () => {
    await dispatch(getUserHistoryOut(''));
  };
  const MoneyOutRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={_.orderBy(userHistoryOut, ['createdAt'], ['desc'])}
        renderItem={MoneyOut}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={<RefreshControl refreshing={refreshLoading} onRefresh={MoneyOutReload} />}
      />
    </View>
  );

  const TransferReceivedReload = async (page) => {
    await dispatch(userHistoryTransferIn({ page }));
  };
  const ReceivedRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={_.orderBy(getUserHistoryTransferIn, ['createdAt'], ['desc'])}
        renderItem={TransferReceived}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.05}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={() => TransferReceivedReload(page)}
          />
        }
      />
    </View>
  );

  const TransferOutReload = async () => {
    await dispatch(userHistoryTransferOut(''));
  };
  const TransferOutRoute = () => (
    <View style={styles.scene}>
      <FlatList
        data={_.orderBy(getUserHistoryTransferOut, ['createdAt'], ['desc'])}
        renderItem={TransferOut}
        keyExtractor={(item, index) => `${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={TransferOutReload} />
        }
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
    first: MoneyInRoute,
    second: MoneyOutRoute,
    third: ReceivedRoute,
    fourth: TransferOutRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar}
      style={styles.tabView}
      renderLabel={({ route, focused }) => <Text style={styles.tabTitle}>{route.title}</Text>}
    />
  );

  const MoneyIn = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
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

  const MoneyOut = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Enouvo Cafe minus:</Text>
          <Text style={styles.textPayment}>-{item.payment} vnd</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  const TransferReceived = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>
            {item.userCreator[0].username} has transferred to you:
          </Text>
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
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>
            You has transferred to {item.userReceiver[0].username}:
          </Text>
          <Text style={styles.textPayment}>{item.payment} vnd</Text>
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
        <Text style={styles.textHeader}>THINK BIG START SMALL MOVE FAST!</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.viewTitle}>
          <Text style={styles.textTitle}>HISTORY</Text>
          <Feather name="clock" size={20} color="#56aaff" />
        </TouchableOpacity>
        {/* {loading ? <ActivityIndicator size="small" color="#ffcc00" /> : null} */}
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
    fontWeight: 'bold',
    fontSize: 17,
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
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
  },
  textTitleNotes: {
    fontFamily: 'Roboto-regular',
    fontSize: 16,
    color: '#56aaff',
  },
  textNotes: {
    fontFamily: 'Roboto-regular',
    fontSize: 16,
    marginLeft: 5,
  },
  textPayment: {
    fontFamily: 'Roboto-regular',
    fontSize: 16,
    color: '#ff5656',
    marginLeft: 5,
  },
});
