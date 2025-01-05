/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

import { Platform, PlatformColor } from 'react-native';

export const Colors = {
  background: '#FDF8FF',
  border: '#acacac',
  itemBackground: '#f5f5f5',

  ...Platform.select({
    ios: {
      // submit: PlatformColor('systemBlueColor'),
      submit: 'black'
    },
    android: {
      // submit: PlatformColor('@android:color/system_primary_light'),
      submit: 'black'
    },
    default: { submit: 'black' },
  }),
};

// NativeWind
// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
// };
