import { registerScreens, NavigationUtils } from './navigation';
import { iconsLoaded } from './utils/AppIcons';
import { store } from './redux/store';

export const startApp = async () => {
  registerScreens();
  try {
    const resIcons = await iconsLoaded;
    console.log(resIcons);
    const isSkip = store.getState().app.isSkip;
    console.log('isSkip', isSkip);

    if (!isSkip) {
      NavigationUtils.startIntoContent();
      return;
    }
    const user = store.getState().auth.user;

    if (user) {
      if (user.scope === 'user') {
        NavigationUtils.startMainContent();
      } else {
        if (user.scope === 'admin') {
          NavigationUtils.startMainAdminContent();
        }
      }
    } else {
      NavigationUtils.startLoginContent();
    }
  } catch (err) {
    console.log(err);
  }
};
