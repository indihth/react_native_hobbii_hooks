import { View, StyleSheet, ImageBackground } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import LoginForm from "../../components/LoginForm";

// Paper Components
import { Button } from "react-native-paper";
const background = require("@/assets/images/pastelBG.jpeg");

export default function HomeScreen() {
  const { session, signOut } = useSession();

  return (
    <View className="flex-1">
      <ImageBackground source={background} resizeMode="cover">
        <View className="justify-center items-center gap-3">
          {session ? (
            <Button onPress={signOut} mode="contained">
              Logout
            </Button>
          ) : (
            <LoginForm />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
