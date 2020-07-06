import { Navigation } from 'react-native-navigation';
import { withReduxProvider } from '../redux/store';

import Login from '../screens/Login';
import Register from '../screens/Login/Register';
import ForgetPassword from '../screens/Login/ForgetPassword';
import VerifyCode from '../screens/Login/VerifyCode';

import Loading from '../screens/Utils/Loading';
import InAppNotification from '../screens/Utils/InAppNotification';
import IntroScreen from '../screens/Intro';
import Home from '../screens/Home';
import History from '../screens/UserScreens/userHistory';
import UploadImage from '../screens/Profile/UploadImage';
import User from '../screens/UserScreens';
import transferMoney from '../screens/Home/transferMoney';
import userTransfer from '../screens/UserScreens/userTransfer';

//Admin Screens
import Admin from '../screens/AdminScreens';
import userProfile from '../screens/AdminScreens/userProfile';
import addUser from '../screens/AdminScreens/addUser';
import plusMoney from '../screens/AdminScreens/plusMoney';
import minusMoney from '../screens/AdminScreens/minusMoney';
import adminHistory from '../screens/AdminScreens/adminHistory';

const SCREENS_WITH_REDUX = {
  Login,
  Register,
  ForgetPassword,
  VerifyCode,
  userTransfer,

  IntroScreen,
  Home,
  History,
  transferMoney,
  UploadImage,
  User,

  Admin,
  userProfile,
  plusMoney,
  minusMoney,
  addUser,
  adminHistory,
};
const SCREENS = {
  Loading,
  InAppNotification,
};

function registerScreens() {
  Object.keys(SCREENS_WITH_REDUX).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => withReduxProvider(SCREENS_WITH_REDUX[screenName]),
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
  Object.keys(SCREENS).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => SCREENS_WITH_REDUX[screenName],
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
}

export default registerScreens;
