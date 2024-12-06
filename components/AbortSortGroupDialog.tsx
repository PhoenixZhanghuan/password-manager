import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type AbortSortGroupDialogRefProps = {
  showDialog: () => {};
  hideDialog: () => {};
};

export type Props = {
  callback: () => void;
};

const AbortSortGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  const handleCancel = () => {
    hideDialog();
  };

  const handleOk = () => {
    props.callback();
    hideDialog();
  };
  

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>提示</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">确定放弃本次排序调整结果?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>取消</Button>
          <Button onPress={handleOk}>确定</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default AbortSortGroupDialog;
