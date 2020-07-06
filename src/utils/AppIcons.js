import IonIcons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'md-home': [24, '#000', 'ionIcons'],
  'md-person': [24, '#000', 'ionIcons'],
  'ios-people': [30, '#000', 'ionIcons'],
  'md-clock': [24, '#000', 'ionIcons'],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  new Promise.all(
    Object.keys(icons).map((iconName) => {
      switch (icons[iconName][2]) {
        case 'ionIcons':
          return IonIcons.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1],
          );
        default:
          // return Icon.getImageSource(
          //   iconName.replace(replaceSuffixPattern, ''),
          //   icons[iconName][0],
          //   icons[iconName][1],
          // );
          return null;
      }
    }),
  ).then((sources) => {
    Object.keys(icons).forEach((iconName, idx) => {
      iconsMap[iconName] = sources[idx];
    });

    // Call resolve (and we are done)
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
