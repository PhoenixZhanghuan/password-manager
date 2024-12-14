import React, { useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { updateAccount } from "@/utils/sqlite";

export default function EditAccountScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountId, setAccountId] = useState(0);
  const [groupId, setGroupId] = useState(0);

  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (!params.account) {
      return;
    }
    let account = JSON.parse(params.account as string);
    setAccountName(account.name);
    setAccountNumber(account.username);
    setAccountPassword(account.password);
    setAccountId(account.id);
    setGroupId(account.group_id);
  }, [params.account]);

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    if (accountName === "" || accountNumber === "" || accountPassword === "") {
      setVisible(true);
      return;
    }
    await updateAccount(
      {
        id: accountId,
        name: accountName,
        username: accountNumber,
        password: accountPassword,
        group_id: groupId,
      },
    );
    router.navigate({
      pathname: "/(tabs)",
      params: { menuItemId: groupId },
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
          title="编辑账户"
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
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>警告</Dialog.Title>
          <Dialog.Content>
            <Text>请填写完整信息</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>关闭</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({});
