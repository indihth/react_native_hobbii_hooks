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
  hardDelete?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  resourceName,
  text,
  id,
  session,
  onDelete,
  hardDelete = false
}) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const deleteResource = async () => {
    // Set to hard delete endpoint if hardDelete is true
    const endpoint = hardDelete ? `/${resourceName}/${id}/hard` : `/${resourceName}/${id}`;
    try {
      setVisible(false);
      await axiosDelete(endpoint, session);
      console.log("after delete");
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
            <Text variant="bodyMedium">
              Are you sure you want to delete this?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={deleteResource}
              mode="contained"
              icon="delete"
              style={{ paddingHorizontal: 5 }}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeleteButton;
