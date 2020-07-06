import { Navigation } from 'react-native-navigation';
import { Colors } from '../themes';
import BottomTab from './BottomTab';

const introScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'IntroScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

const login = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

const mainTab = (profileScreen) => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          BottomTab('Home', 'md-home', defaultTopBar, 'Home', 'ic-done'),
          BottomTab('History', 'md-clock', defaultTopBar, 'History'),
          BottomTab('User', 'md-person', defaultTopBar, 'Profile'),
        ],
        options: {
          bottomTabs: {
            backgroundColor: Colors.white,
            animate: false,
            titleDisplayMode: 'alwaysShow',
          },
        },
      },
    },
  });
};

const mainTabAdmin = (adminScreen) => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          BottomTab('Home', 'md-home', defaultTopBar, 'Home', 'ic-done'),
          BottomTab('Admin', 'ios-people', defaultTopBar, 'Users'),
          BottomTab('adminHistory', 'md-clock', defaultTopBar, 'History'),
          BottomTab('User', 'md-person', defaultTopBar, 'Profile'),
        ],
        options: {
          bottomTabs: {
            backgroundColor: Colors.white,
            animate: false,
            titleDisplayMode: 'alwaysShow',
          },
        },
      },
    },
  });
};

export function showConfirmAlert(options = {}) {
  Navigation.showOverlay({
    component: {
      name: 'ConfirmAlert',
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
        layout: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        statusBar: {
          style: 'light',
        },
      },
      passProps: options,
    },
  });
}

export default {
  introScreen,
  login,
  mainTab,
  mainTabAdmin,
};

const bottomTab = {
  // badge: '2',
  // badgeColor: 'red',
  backgroundColor: Colors.primary,
  textColor: Colors.tabInActiveColor,
  iconColor: Colors.tabInActiveColor,
  selectedIconColor: Colors.tabActiveColor,
  selectedTextColor: Colors.tabActiveColor,
  iconInsets: {
    top: 5,
    left: 0,
    bottom: -5,
    right: 0,
  },
  fontSize: 10,
  drawBehind: false,
  // fontFamily: Fonts.type.semiBold,
  // titleDisplayMode: 'alwaysHide',
  disableIconTint: true, // set true if you want to disable the icon tinting
  disableSelectedIconTint: true,
};

const defaultTopBar = {
  visible: false,
  drawerBehind: false,
  noBorder: true,
  background: {
    color: Colors.primary,
  },
};
