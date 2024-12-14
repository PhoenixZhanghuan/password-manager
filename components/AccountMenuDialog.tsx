import { Account } from "@/app/(tabs)";
import * as React from "react";
import { Button, Dialog, Portal } from "react-native-paper";

export type AccountMenuDialogRefProps = {
  showDialog: (item: Account) => {};
  hideDialog: () => {};

};

export type Props = {
  topAccount: (item: Account) => void;
  editAccount: (item: Account) => void;
  copyAccount: (item: Account) => void;
  deleteAccount: (item: Account) => void;
};

const AccountMenuDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState<Account | null>(null);
  const showDialog = (item: Account) => {
    setVisible(true);
    setItem(item);
  };
  const hideDialog = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  const handleTopAccount = () => {
    console.log("置顶账号", item);
    props.topAccount?.(item!);
    hideDialog();
  };
  const handleEditAccount = () => {
    console.log("编辑账号", item);
    props.editAccount?.(item!);
    hideDialog();
  };
  const handleCopyAccount = () => {
    console.log("复制账号", item);
    props.copyAccount?.(item!);
    hideDialog();
  };
  const handleDeleteAccount = () => {
    console.log("删除账号", item);
    props.deleteAccount?.(item!);
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Button onPress={handleTopAccount}>置顶账号</Button>
          <Button onPress={handleEditAccount}>编辑账号</Button>
          <Button onPress={handleCopyAccount}>复制账号</Button>
          <Button onPress={handleDeleteAccount}>删除账号</Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
});

export default AccountMenuDialog;

