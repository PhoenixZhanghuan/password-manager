import React, { useState } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { addAccount } from "@/utils/sqlite";

export default function GroupSortScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountPassword, setAccountPassword] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    if (accountName === "" || accountNumber === "" || accountPassword === "") {
      alert("请填写完整信息");
      return;
    }
    console.log(
      "accountName>>>",
      accountName,
      "accountNumber>>>",
      accountNumber,
      "accountPassword>>>",
      accountPassword,
      "menuItemId>>>",
      params.menuItemId
    );
    await addAccount(
      accountName,
      accountNumber,
      accountPassword,
      parseInt(params.menuItemId as string)
    );
    router.navigate({
      pathname: "/(tabs)",
      params: { menuItemId: params.menuItemId },
    });

    setAccountName("");
    setAccountNumber("");
    setAccountPassword("");
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
          title="添加账户"
          color={Colors[colorScheme ?? "light"].navContent}
        />
        <Appbar.Action
          icon="check-bold"
          onPress={handleConfirm}
          color={Colors[colorScheme ?? "light"].navContent}
        />
      </Appbar.Header>
      <View style={{ padding: 10 }}>
        <TextInput
          mode="outlined"
          label="名称"
          value={accountName}
          onChangeText={setAccountName}
          placeholder="请输入内容..."
          right={
            <TextInput.Icon icon="delete" onPress={() => setAccountName("")} />
          }
        />
        <TextInput
          mode="outlined"
          label="账号"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="请输入内容..."
          right={
            <TextInput.Icon
              icon="delete"
              onPress={() => setAccountNumber("")}
            />
          }
        />
        <TextInput
          mode="outlined"
          label="密码"
          value={accountPassword}
          onChangeText={setAccountPassword}
          placeholder="请输入内容..."
          right={
            <TextInput.Icon
              icon="delete"
              onPress={() => setAccountPassword("")}
            />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
