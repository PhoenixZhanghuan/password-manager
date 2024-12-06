import * as React from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export type EditGroupDialogRefProps = {
  showDialog: (item: string, index: number) => {};
  hideDialog: () => {};
};

export type Props = {
  handleRenameCallback: (item: string, index: number) => void;
  handleDeleteCallback: (item: string, index: number) => void;
  handleSortCallback: () => void;
};

const EditGroupDialog = React.forwardRef((props: Props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const showDialog = (item: string, index: number) => {
    setVisible(true);
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
    props.handleRenameCallback?.(item, index);
  };

  const handleDelete = () => {
    props.handleDeleteCallback?.(item, index);
    hideDialog();
  };

  const handleSort = () => {
    props.handleSortCallback?.();
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Button onPress={handleRename}>重命名组</Button>
          <Button onPress={handleDelete}>删除组</Button>
          <Button onPress={handleSort}>组排序</Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
});

export default EditGroupDialog;
