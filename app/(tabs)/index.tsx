import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Appbar, Button, Icon, MD3Colors } from "react-native-paper";

export default function HomeScreen() {
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
        <Appbar.Action icon="plus" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
