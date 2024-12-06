import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type DeleteGroupDialogRefProps = {
  showDialog: (item: string, index: number) => {};
  hideDialog: () => {};
};

export type Props = {
  callback: (index: number) => void;
};

const DeleteGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const showDialog = (item: string, index: number) => {
    setItem(item);
    setIndex(index);
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  const handleCancel = () => {
    hideDialog();
  };

  const handleOk = () => {
    props.callback(index);
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>删除组 {item}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            删除组及其下的所有账户数据。删除后无法恢复，确定要删除吗？{" "}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>取消</Button>
          <Button onPress={handleOk}>确定</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DeleteGroupDialog;
