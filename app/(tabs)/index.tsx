import { View, StyleSheet } from 'react-native';
import { useSession } from "@/contexts/AuthContext";
import LoginForm from "../../components/LoginForm";

// Paper Components
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const { session, signOut } = useSession();


  return (
    <View className='flex-1 justify-center items-center gap-3'>
      

    {session ? (
      <Button onPress={signOut} mode='contained'>Logout</Button>
    ) : (
      <LoginForm />
    )}
  </View>
  );
}
