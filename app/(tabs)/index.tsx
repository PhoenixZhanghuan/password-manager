import {
  Image,
  StyleSheet,
  View,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import AddGroupDialog, {
  type AddGroupDialogRefProps,
} from "@/components/AddGroupDialog";
import EditGroupDialog, {
  type EditGroupDialogRefProps,
} from "@/components/EditGroupDialog";
import RenameGroupDialog, {
  RenameGroupDialogRefProps,
} from "@/components/RenameGroupDialog";
import DeleteGroupDialog, {
  DeleteGroupDialogRefProps,
} from "@/components/DeleteGroupDialog";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  initializeDatabase,
  addGroup,
  deleteGroup,
  updateGroup,
  getAllGroups,
} from "@/utils/sqlite";

// 定义样式类型
type StyleParams = "light" | "dark";

type MenuType = { id: number; name: string };

export default function HomeScreen() {
  const { menu: adjustedMenu } = useLocalSearchParams();
  const colorScheme = useColorScheme() as StyleParams;
  const styles = createStyles(colorScheme);
  const [menu, setMenu] = React.useState<MenuType[]>([]);
  const addGroupDialogRef = React.useRef<AddGroupDialogRefProps>(null);
  const editGroupDialogRef = React.useRef<EditGroupDialogRefProps>(null);
  const renameGroupDialogRef = React.useRef<RenameGroupDialogRefProps>(null);
  const deleteGroupDialogRef = React.useRef<DeleteGroupDialogRefProps>(null);
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(0);

  const renderMenuItem = ({
    item,
    index,
  }: {
    item: MenuType;
    index: number;
  }) => {
    const isSelected = selectedItemId === item.id; // Assuming each item has a unique id
    return (
      <View
        style={{
          alignItems: "center",
          height: 40,
        }}
      >
        <Button
          textColor={
            isSelected
              ? Colors[colorScheme ?? "light"].selectedText
              : Colors[colorScheme ?? "light"].text
          }
          onPress={() => setSelectedItemId(item.id)}
          onLongPress={() => handleEditMenuItem(item.name, index)}
          style={styles.groupBtn}
        >
          {item.name}
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

  const addGroupItem = async (group: string) => {
    let newGroupId = await addGroup(group); // Insert into database
    setMenu((prev) => [...prev, { id: newGroupId, name: group }]); // Update local state with ID
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (adjustedMenu) {
      let newAdjustedMenu = JSON.parse(adjustedMenu as string);
      setMenu(newAdjustedMenu);
      Promise.all(
        newAdjustedMenu.map(
          (item: MenuType, index: number) => {
            return updateGroup(item.id, item.name, index); // Update the sort_order based on the index
          }
        )
      );
    }
  }, [adjustedMenu]);

  const initData = async () => {
    await initializeDatabase();
    const data = (await getAllGroups()) as MenuType[];
    if (data.length > 0) {
      setMenu(data.map((group: MenuType) => ({ id: group.id, name: group.name }))); // Store both id and name
    }
    setSelectedItemId(data?.[0]?.id);
  };

  const handleEditMenuItem = (item: string, index: number) => {
    editGroupDialogRef.current?.showDialog(item, index);
  };

  const editGroupItem = (item: string, index: number) => {
    renameGroupDialogRef.current?.showDialog(item, index);
  };

  const renameGroupItem = async (text: string, index: number) => {
    const groupId = menu[index].id; // Get the ID from the menu
    await updateGroup(groupId, text, index); // Update in database
    const newMenu = [...menu];
    newMenu[index].name = text; // Update the name in local state
    setMenu(newMenu);
  };

  const handleDeleteGroup = (item: string, index: number) => {
    deleteGroupDialogRef.current?.showDialog(item, index);
  };

  const deleteGroupItem = async (index: number) => {
    const groupId = menu[index].id; // Get the ID from the menu
    await deleteGroup(groupId); // Delete from database
    const newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  };

  const handleSortGroup = () => {
    router.navigate({
      pathname: "/home/GroupSort",
      params: { menu: JSON.stringify(menu) },
    });
  };

  const AddAccount = () => {
    router.navigate({
      pathname: "/home/AddAccount",
      params: { menu: JSON.stringify(menu) },
    });
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
          title="主页"
          color={Colors[colorScheme ?? "light"].navContent}
        />
        <Appbar.Action
          icon="plus"
          iconColor={Colors[colorScheme ?? "light"].navContent}
          onPress={AddAccount}
        />
        <Appbar.Action
          icon="magnify"
          iconColor={Colors[colorScheme ?? "light"].navContent}
          onPress={() => {}}
        />
      </Appbar.Header>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            height: "100%",
            borderRightWidth: StyleSheet.hairlineWidth,
            borderRightColor: Colors[colorScheme ?? "light"].borderColor,
          }}
        >
          <FlatList
            contentContainerStyle={{
              alignItems: "center",
              width: 80,
            }}
            data={menu}
            renderItem={renderMenuItem}
            ListFooterComponent={renderMenuFooter}
          />
        </View>
      </View>
      <AddGroupDialog ref={addGroupDialogRef} callback={addGroupItem} />
      <EditGroupDialog
        ref={editGroupDialogRef}
        handleRenameCallback={editGroupItem}
        handleDeleteCallback={handleDeleteGroup}
        handleSortCallback={handleSortGroup}
      />
      <RenameGroupDialog
        ref={renameGroupDialogRef}
        callback={renameGroupItem}
      />
      <DeleteGroupDialog
        ref={deleteGroupDialogRef}
        callback={deleteGroupItem}
      />
    </View>
  );
}

const createStyles = (colorScheme: StyleParams) =>
  StyleSheet.create({
    groupBtn: {
      borderBottomColor: Colors[colorScheme ?? "light"].borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
