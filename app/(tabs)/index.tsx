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
import RenameGroupDialog, {
  RenameGroupDialogRefProps,
} from "@/components/RenameGroupDialog";
import DeleteGroupDialog, {
  DeleteGroupDialogRefProps,
} from "@/components/DeleteGroupDialog";
import { useLocalSearchParams, useRouter } from "expo-router";
import { initializeDatabase, addGroup, deleteGroup, updateGroup, getAllGroups } from "@/utils/sqlite";

// 定义样式类型
type StyleParams = "light" | "dark";

export default function HomeScreen() {
  const { menu: adjustedMenu } = useLocalSearchParams();
  const colorScheme = useColorScheme() as StyleParams;
  const styles = createStyles(colorScheme);
  const [menu, setMenu] = React.useState<{ id: number; name: string }[]>([]);
  const addGroupDialogRef = React.useRef<AddGroupDialogRefProps>(null);
  const editGroupDialogRef = React.useRef<EditGroupDialogRefProps>(null);
  const renameGroupDialogRef = React.useRef<RenameGroupDialogRefProps>(null);
  const deleteGroupDialogRef = React.useRef<DeleteGroupDialogRefProps>(null);
  const router = useRouter();

  const renderMenuItem = ({ item, index }: { item: { id: number; name: string }; index: number }) => {
    return (
      <View style={{ alignItems: "center", height: 40 }}>
        <Button
          textColor={Colors[colorScheme ?? "light"].text}
          onPress={() => {}}
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
      Promise.all(newAdjustedMenu.map((item: { id: number; name: string }, index: number) => {
        return updateGroup(item.id, item.name, index); // Update the sort_order based on the index
      }));
    }
  }, [adjustedMenu]);

  const initData = async () => {
    console.log("initData>>>");
    await initializeDatabase();
    console.log("initData>>>2");
    const data = await getAllGroups();
    console.log("data>>>", data);
    if (data.length > 0) {
      setMenu(data.map((group: any) => ({ id: group.id, name: group.name }))); // Store both id and name
    }
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
          onPress={() => {}}
        />
        <Appbar.Action
          icon="magnify"
          iconColor={Colors[colorScheme ?? "light"].navContent}
          onPress={() => {}}
        />
      </Appbar.Header>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{    
            height: "100%",        
            borderRightWidth: StyleSheet.hairlineWidth,
            borderRightColor: Colors[colorScheme ?? "light"].borderColor,}} >
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
