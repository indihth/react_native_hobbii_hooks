import { StyleSheet, Text, Image, Platform } from 'react-native';

export default function TabTwoScreen() {
  return (
  <Text>Testing text</Text>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
