/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primary = '#6750A4';
const primaryDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    navBackground: primary,
    navContent: '#fff',
    tint: primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    navBackground: primary,
    navContent: '#fff',
    tint: primaryDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryDark,
  },
};
