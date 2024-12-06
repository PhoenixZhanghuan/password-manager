import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type RenameGroupDialogRefProps = {
  showDialog: (item: string, index: number) => {};
  hideDialog: () => {};
};

export type Props = {
  callback: (text: string, index: number) => void;
};

const RenameGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const showDialog = (item: string, index: number) => {
    setText(item);
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
    setText("");
  };

  const handleOk = () => {
    props.callback(text, index);
    hideDialog();
    setText("");
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>重命名组</Dialog.Title>
        <Dialog.Content>
          <TextInput value={text} onChangeText={(text) => setText(text)} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>取消</Button>
          <Button onPress={handleOk}>确定</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default RenameGroupDialog;
