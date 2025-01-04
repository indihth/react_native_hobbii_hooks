import { useState } from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";
import { axiosDelete } from "@/api/axiosInstance";
import { View, Alert } from "react-native";
import { router } from "expo-router";

interface DeleteButtonProps {
  resourceName: string;
  text: string;
  id: string;
  session: string | null | undefined;
  onDelete?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  resourceName,
  text,
  id,
  session,
  onDelete,
}) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const deleteResource = async () => {
    try {
      console.log("delete try catch");
      console.log(resourceName);
      await axiosDelete(`/${resourceName}/${id}`, session);
      // router.replace(`/${resourceName}` as any); // sends user to index, rerenders with update. (unsure on type error)
router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to delete resource");
      console.error("Failed to delete resource:", error);
    }
  };

  return (
    <View>
      <Button
        onPress={() => setVisible(true)} // Call the delete function directly on button press
      >
        {text}
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title className="text-center">Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete this?</Text>
          </Dialog.Content>
          <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={deleteResource} mode="contained" icon="delete" style={{ paddingHorizontal: 5 }}>Yes</Button>
        </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeleteButton;
