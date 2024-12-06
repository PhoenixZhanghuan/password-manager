import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar } from "react-native-paper";
import { Colors } from "@/constants/Colors";

export default function GroupSortScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();

  const [data, setData] = useState<string[]>(JSON.parse(params.menu as string));

  const renderItem = ({ item, drag, isActive }: RenderItemParams<string>) => (
    // 将拖拽绑定到整个 View
    <TouchableOpacity
      style={[styles.item, { backgroundColor: isActive ? "#ccc" : "#ff6666" }]}
      activeOpacity={1.0}
      onLongPress={drag} // 在整个 View 上开启拖拽
    >
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );

  const handleBack = () => {
    if (JSON.stringify(data) === params.menu) {
      router.back();
      return;
    }
  };

  const handleConfirm = () => {
    router.navigate({
      pathname: "/(tabs)",
      params: { menu: JSON.stringify(data) },
    });
  };

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].navBackground,
        }}
      >
        <Appbar.BackAction
          onPress={handleBack}
          color={Colors[colorScheme ?? "light"].navContent}
        />
        <Appbar.Content
          title="调整分组排序"
          color={Colors[colorScheme ?? "light"].navContent}
        />
        <Appbar.Action
          icon="check-bold"
          onPress={handleConfirm}
          color={Colors[colorScheme ?? "light"].navContent}
        />
      </Appbar.Header>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        onDragEnd={({ data }) => setData(data)} // 更新排序后的数据
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // 添加阴影效果
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
