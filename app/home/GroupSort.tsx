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
import { Appbar, IconButton } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import AbortSortGroupDialog, {
  AbortSortGroupDialogRefProps,
} from "@/components/AbortSortGroupDialog";

export default function GroupSortScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();

  const [data, setData] = useState<string[]>(JSON.parse(params.menu as string));

  const abortSortGroupDialogRef =
    React.useRef<AbortSortGroupDialogRefProps>(null);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<string>) => (
    // 将拖拽绑定到整个 View
    <View style={[styles.item]}>
      <Text style={styles.text}>{item}</Text>
      <IconButton
        style={{backgroundColor: isActive ?"#ccc" : "#fff"}}
        icon="menu"
        iconColor={Colors[colorScheme ?? "light"].icon}
        size={20}
        onPress={() => {}}
        onLongPress={drag} // 在整个 View 上开启拖拽
      />
    </View>
  );

  const handleBack = () => {
    if (JSON.stringify(data) === params.menu) {
      router.back();
      return;
    } else {
      abortSortGroupDialogRef.current?.showDialog();
    }
  };

  const handleConfirm = () => {
    router.navigate({
      pathname: "/(tabs)",
      params: { menu: JSON.stringify(data) },
    });
  };

  const handleAbortSort = () => {
    router.back();
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
      <AbortSortGroupDialog
        ref={abortSortGroupDialogRef}
        callback={handleAbortSort}
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
