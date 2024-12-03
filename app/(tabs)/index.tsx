import {
  Image,
  StyleSheet,
  View,
  FlatList,
  useColorScheme,
} from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import AddGroupDialog, {
  type AddGroupDialogRefProps,
} from "@/components/AddGroupDialog";
import EditGroupDialog, {
  type EditGroupDialogRefProps,
} from "@/components/EditGroupDialog";
import * as asyncStorageUtil from "@/utils/asyncStorageUtil";
import RenameGroupDialog, { RenameGroupDialogRefProps } from "@/components/RenameGroupDialog";

const INIT_DATA = ["默认", "工作", "游戏"];
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [menu, setMenu] = React.useState(INIT_DATA);
  const addGroupDialogRef = React.useRef<AddGroupDialogRefProps>(null);
  const editGroupDialogRef = React.useRef<EditGroupDialogRefProps>(null);
  const renameGroupDialogRef = React.useRef<RenameGroupDialogRefProps>(null);

  const renderMenuItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={{ alignItems: "center", height: 40 }}>
        <Button
          textColor={Colors[colorScheme ?? "light"].text}
          onPress={() => {}}
          onLongPress={() => handleEditMenuItem(item, index)}
        >
          {item}
        </Button>
      </View>
    );
  };

  const renderMenuFooter = () => {
    return (
      <IconButton
        icon="plus"
        iconColor={Colors[colorScheme ?? "light"].icon}
        size={20}
        onPress={addMenuItem}
      />
    );
  };

  const addMenuItem = () => {
    addGroupDialogRef.current?.showDialog();
  };

  const addGroupItem = (group: string) => {
    setMenu((prev) => [...prev, group]);
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const data = await asyncStorageUtil.getItemStorage("menu");
    if (data) {
      setMenu(JSON.parse(data));
    }
  };

  useEffect(() => {
    asyncStorageUtil.setItemStorage("menu", JSON.stringify(menu));
  }, [menu]);

  const handleEditMenuItem = (item: string, index: number) => {
    editGroupDialogRef.current?.showDialog(item, index);
  };

  const editGroupItem = (item: string, index: number) => {
    renameGroupDialogRef.current?.showDialog(item, index);
  };

  const renameGroupItem = (text: string, index: number) => {
    const newMenu = [...menu];
    newMenu[index] = text;
    setMenu(newMenu);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Appbar.Header
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].navBackground,
        }}
      >
        <Appbar.Content
          title="Home"
          color={Colors[colorScheme ?? "light"].navContent}
        />
        <Appbar.Action
          icon="plus"
          iconColor={Colors[colorScheme ?? "light"].navContent}
          onPress={() => {}}
        />
        <Appbar.Action
          icon="magnify"
          iconColor={Colors[colorScheme ?? "light"].navContent}
          onPress={() => {}}
        />
      </Appbar.Header>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <FlatList
          contentContainerStyle={{ alignItems: "center", width: 90 }}
          data={menu}
          renderItem={renderMenuItem}
          ListFooterComponent={renderMenuFooter}
        />
      </View>
      <AddGroupDialog ref={addGroupDialogRef} callback={addGroupItem} />
      <EditGroupDialog ref={editGroupDialogRef} callback={editGroupItem} />
      <RenameGroupDialog ref={renameGroupDialogRef} callback={renameGroupItem} />
    </View>
  );
}

const styles = StyleSheet.create({});
