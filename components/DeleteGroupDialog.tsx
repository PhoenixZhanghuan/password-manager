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
        <Dialog.Title>Delete Group {item}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Delete the group and all account data under the group. After
            deletion, it will not be recovered, are you sure?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleOk}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DeleteGroupDialog;
