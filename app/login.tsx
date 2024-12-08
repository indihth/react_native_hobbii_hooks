import axios from "axios";
import { useState } from "react";
import { router } from 'expo-router';
import { useSession } from "@/contexts/AuthContext";
import { API_URL } from "../config";

// Paper Components
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button, TextInput, Text } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

const background = require("@/assets/images/pastelBG.jpeg");

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { signIn } = useSession();

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState, // takes what is already in form (spread operator)
      [e.target.id]: e.target.value, // Takes the id form TextInput and set to the value in that element ie. value={form.email}
    }));
  };

  const handlePress = (e: any) => {
    axios
      .post(`${API_URL}/users/login`, {
        // can send entire 'form' or use an object for customisation
        email: form.email,
        password: form.password,
        // Can explude fields that shouldn't be sent to server
      })
      .then((response) => {
        signIn(response.data.token);
        console.log(`Response:
              ${response.data.token}`);
            //   Send user to next screen after successful login
            router.replace('/')
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={background}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]} // Gradient of black
        >
          <SafeAreaView className="flex-1 mx-5">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Hobbii Hooks
              </Text>
              <Text className="text-center text-white text-2xl mt-3">
                Discover your next project
              </Text>
            </View>

            <View className="flex-1 justify-center">
              <Text variant="titleLarge">Login Form</Text>
              <TextInput
                placeholder="Email"
                value={form.email} // set as blank by default (useState)
                onChange={handleChange}
                id="email"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={form.password} // set as blank by default (useState)
                onChange={handleChange}
                id="password"
              />

              {/* Displaying error */}
              <Text variant="bodyMedium">{error}</Text>

              <Button onPress={handlePress} mode="contained">
                Login
              </Button>
            </View>

            {/* sets android status bar colors, time, wifi, battery */}
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
