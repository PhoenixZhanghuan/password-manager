import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type EditGroupDialogRefProps = {
  showDialog: (item: string, index: number) => {};
  hideDialog: () => {};
};

export type Props = {
  callback: (item: string, index: number) => void;
};

const EditGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const showDialog = (item: string, index: number) => {
    setVisible(true)
    setItem(item);
    setIndex(index);
};
  const hideDialog = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  const handleRename = () => {
    hideDialog();
    props.callback?.(item, index);
  };

  const handleDelete = () => {
    hideDialog();
  };

  const handleSort = () => {
    hideDialog();
  };
  

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
        <Button onPress={handleRename}>Rename Group</Button>
        <Button onPress={handleDelete}>Delete Group</Button>
        <Button onPress={handleSort}>Group Sort</Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
});

export default EditGroupDialog;
