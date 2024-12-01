import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme, View } from "react-native";

import { Appbar } from "react-native-paper";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <Appbar.Header style={{ backgroundColor: Colors[colorScheme ?? 'light'].navBackground }}>
        <Appbar.Content title="Settings" color={Colors[colorScheme ?? 'light'].navContent}/>
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
