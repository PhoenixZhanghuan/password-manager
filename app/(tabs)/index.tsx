import { Image, StyleSheet, View, FlatList, useColorScheme } from "react-native";
import {
  Appbar,
  Button,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import React from "react";
import { Colors } from "@/constants/Colors";
const INIT_DATA = ["默认", "工作", "游戏"];
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [data, setData] = React.useState(INIT_DATA);

  const renderMenuItem = ({ item }: { item: string }) => {
    return (
      <Button textColor={Colors[colorScheme ?? 'light'].text} onPress={() => {}}>
        {item}
      </Button>
    );
  };

  const renderMenuFooter = () => {
    return (
      <IconButton
        icon="plus"
        iconColor={Colors[colorScheme ?? 'light'].icon}
        size={20}
        onPress={() => console.log("Pressed")}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <Appbar.Header style={{ backgroundColor: Colors[colorScheme ?? 'light'].navBackground }}>
        <Appbar.Content title="Home" color={Colors[colorScheme ?? 'light'].navContent} />
        <Appbar.Action
          icon="plus"
          iconColor={Colors[colorScheme ?? 'light'].navContent}
          onPress={() => {}}
        />
        <Appbar.Action
          icon="magnify"
          iconColor={Colors[colorScheme ?? 'light'].navContent}
          onPress={() => {}}
        />
      </Appbar.Header>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <FlatList
          contentContainerStyle={{ alignItems: "center", width: 80 }}
          data={data}
          renderItem={renderMenuItem}
          ListFooterComponent={renderMenuFooter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
