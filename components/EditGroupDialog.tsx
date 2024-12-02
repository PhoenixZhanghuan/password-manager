import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type EditGroupDialogRefProps = {
  showDialog: () => {};
  hideDialog: () => {};
};

export type Props = {
  callback: () => void;
};

const EditGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    showDialog,
    hideDialog,
  }));

  const handleRename = () => {
    hideDialog();
    props.callback?.();
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
