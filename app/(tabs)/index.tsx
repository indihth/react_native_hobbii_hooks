import { View, StyleSheet } from 'react-native';
import { useSession } from "@/contexts/AuthContext";
import LoginForm from "../../components/LoginForm";

// Paper Components
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const { session, signOut } = useSession();


  return (
    <View style={styles.container}>
      

    {session ? (
      <Button onPress={signOut} mode='contained'>Logout</Button>
    ) : (
      <LoginForm />
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});