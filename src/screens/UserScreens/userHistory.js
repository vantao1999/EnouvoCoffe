/* eslint-disable react-hooks/exhaustive-deps */
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
  getTransferOut,
  getTransferIn,
  getTransactionIn,
  getTransactionOut,
} from '../../redux/TransactionRedux/operations';
import NumberFormat from 'react-number-format';

const History = () => {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => get(state, 'trans.loading', null));

  useEffect(() => {
    firstRender();
  }, [firstRender]);

  const firstRender = async () => {
    await dispatch(getTransactionIn({ page: pageMoneyIn }));
    await dispatch(getTransactionOut({ page: 1 }));
    await dispatch(getTransferIn({ page: 1 }));
    await dispatch(getTransferOut({ page: 1 }));
  };

  const dataTransactionIn = useSelector((state) =>
    get(state, 'trans.listHistoryTransactionIn', null),
  );
  console.log('dataTransactionIn', dataTransactionIn);
  const historyTransactionIn = useSelector((state) =>
    get(state, 'trans.dataHistoryTransactionIn', null),
  );
  const [pageMoneyIn, setPageMoneyIn] = React.useState(1);
  const handleLoadTransactionIn = async () => {
    if (historyTransactionIn.current_page <= historyTransactionIn.page_count) {
      await setPageMoneyIn(pageMoneyIn + 1);
      let temPage = pageMoneyIn + 1;
      await dispatch(getTransactionIn({ page: temPage }));
    }
  };
  const MoneyInReload = async (page) => {
    await dispatch(getTransactionIn({ page }));
  };
  const MoneyIn = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Enouvo Cafe plus money:</Text>
          <Text style={styles.textPayment}>
            +
            <NumberFormat
              value={item.payment}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );
  const MoneyInRoute = () => (
    <View style={styles.scene}>
      <FlatList
        // data={_.orderBy(dataTransactionIn, ['createdAt'], ['desc'])}
        data={dataTransactionIn}
        renderItem={MoneyIn}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={handleLoadTransactionIn}
        onEndReachedThreshold={0.05}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={() => MoneyInReload(pageMoneyIn)}
          />
        }
      />
    </View>
  );

  const dataTransactionOut = useSelector((state) =>
    get(state, 'trans.listHistoryTransactionOut', null),
  );
  const historyTransactionOut = useSelector((state) =>
    get(state, 'trans.dataHistoryTransactionOut', null),
  );
  const [pageMoneyOut, setPageMoneyOut] = React.useState(1);
  const handleLoadTransactionOut = async () => {
    if (historyTransactionOut.current_page <= historyTransactionOut.page_count) {
      await setPageMoneyOut(pageMoneyOut + 1);
      let temPage = pageMoneyOut + 1;
      await dispatch(getTransactionOut({ page: temPage }));
    }
  };
  const MoneyOutReload = async (page) => {
    await dispatch(getTransactionOut({ page }));
  };
  const MoneyOut = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>Enouvo Cafe minus:</Text>
          <Text style={styles.textPayment}>
            -
            <NumberFormat
              value={item.payment}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );
  const MoneyOutRoute = () => (
    <View style={styles.scene}>
      <FlatList
        // data={_.orderBy(dataTransactionOut, ['createdAt'], ['desc'])}
        data={dataTransactionOut}
        renderItem={MoneyOut}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={handleLoadTransactionOut}
        onEndReachedThreshold={0.05}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={() => MoneyOutReload(pageMoneyOut)}
          />
        }
      />
    </View>
  );

  const dataTransferIn = useSelector((state) => get(state, 'trans.listHistoryTransferIn', null));
  const historyTransferIn = useSelector((state) => get(state, 'trans.dataHistoryTransferIn', null));
  const [pageTransferIn, setPageTransferIn] = React.useState(1);
  const handleLoadTransferIn = async () => {
    if (historyTransferIn.current_page <= historyTransferIn.page_count) {
      await setPageTransferIn(pageTransferIn + 1);
      let temPage = pageTransferIn + 1;
      await dispatch(getTransferIn({ page: temPage }));
    }
  };
  const TransferReceivedReload = async (page) => {
    await dispatch(getTransferIn({ page }));
  };
  const TransferReceived = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>
            {item.userCreator[0].username} has transferred to you:
          </Text>
          <Text style={styles.textPayment}>
            +
            <NumberFormat
              value={item.payment}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );
  const ReceivedRoute = () => (
    <View style={styles.scene}>
      <FlatList
        // data={_.orderBy(dataTransferIn, ['createdAt'], ['desc'])}
        data={dataTransferIn}
        renderItem={TransferReceived}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={handleLoadTransferIn}
        onEndReachedThreshold={0.05}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={() => {
              TransferReceivedReload(pageTransferIn);
            }}
          />
        }
      />
    </View>
  );

  const dataTransferOut = useSelector((state) => get(state, 'trans.listHistoryTransferOut', null));
  const historyTransferOut = useSelector((state) =>
    get(state, 'trans.dataHistoryTransferOut', null),
  );
  const [pageTransferOut, setPageTransferOut] = React.useState(1);
  const handleLoadTransferOut = async () => {
    if (historyTransferOut.current_page <= historyTransferOut.page_count) {
      await setPageTransferOut(pageTransferOut + 1);
      let temPage = pageTransferOut + 1;
      await dispatch(getTransferOut({ page: temPage }));
    }
  };
  const TransferOutReload = async (page) => {
    await dispatch(getTransferOut({ page }));
  };
  const TransferOut = ({ item }) => (
    <View>
      <Text style={styles.textDate}>{moment(item.createdAt).format('MMMM D, YYYY - h:mm a')}</Text>
      <View style={styles.historyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textHistoryTitle}>
            You has transferred to {item.userReceiver[0].username}:
          </Text>
          <Text style={styles.textPayment}>
            -
            <NumberFormat
              value={item.payment}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <Text>{value}</Text>}
            />{' '}
            vnd
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitleNotes}>Message:</Text>
          <Text style={styles.textNotes}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );
  const TransferOutRoute = () => (
    <View style={styles.scene}>
      <FlatList
        // data={_.orderBy(dataTransferOut, ['createdAt'], ['desc'])}
        data={dataTransferOut}
        renderItem={TransferOut}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={handleLoadTransferOut}
        onEndReachedThreshold={0.05}
        initialNumToRender={6}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={() => TransferOutReload(pageTransferOut)}
          />
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
    paddingVertical: 10,
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
