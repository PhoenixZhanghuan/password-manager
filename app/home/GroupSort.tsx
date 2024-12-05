import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface Item {
  key: string;
  label: string;
  backgroundColor: string;
}

export default function GroupSortScreen() {
  const [data, setData] = useState<Item[]>([
    { key: "1", label: "Item 1", backgroundColor: "#ff6666" },
    { key: "2", label: "Item 2", backgroundColor: "#ffcc66" },
    { key: "3", label: "Item 3", backgroundColor: "#66ff66" },
    { key: "4", label: "Item 4", backgroundColor: "#66ccff" },
  ]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
    // 将拖拽绑定到整个 View
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: isActive ? "#ccc" : item.backgroundColor },
      ]}
      activeOpacity={1.0}
      onLongPress={drag} // 在整个 View 上开启拖拽
    >
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      onDragEnd={({ data }) => setData(data)} // 更新排序后的数据
    />
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
