import axios from "axios";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { API_URL } from "../config";

// Paper Components
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Text,
} from "react-native-paper";
import { View, ImageBackground, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";

const background = require("@/assets/images/pastelBG.jpeg");

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { signIn } = useSession();

  // Higher-order function, passing in a field name to dynamically set the state
  const handleChange = (field: string) => (value: string) => {
    setForm((prevState) => ({
      ...prevState, // takes what is already in form (spread operator)
      [field]: value, // target.id is web only, use field name instead for android
    }));
  };

  const handlePress = (e: any) => {
    // Popup alert if email or password are empty
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please enter a valid email and password");
      return;
    }

    setSubmitting(true);

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
        router.replace("/");
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error", e.response.data.message);
        setError(e.response.data.message);

        // reset password field if auth failed
        setForm({ email: form.email, password: "" });
      })
      .finally(() => {
        setSubmitting(false);
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
              <Text className="text-center text-white text-4xl">
                Hobbii Hooks
              </Text>
              <Text className="text-center text-red-500 text-2xl mt-3">
                Discover your next project
              </Text>
            </View>

            <View className="flex-1 justify-center">
              <FormField
                title="Email"
                value={form.email}
                handleChangeText={handleChange("email")}
                keyboardType="email-address"
              />
              <FormField
                title="Password"
                value={form.password}
                handleChangeText={handleChange("password")}
              />

              {/* Displaying error */}
              <Text
                variant="bodyMedium"
                className="justify-center items-center text-red-500"
              >
                {error}
              </Text>

              <Button onPress={handlePress} mode="contained">
                Login
              </Button>

              <View>
                <Text variant="bodySmall" className="text-center text-white mt-5">
                  Don't have an account?
                </Text>
                <Link href="/register" className="text-center text-white">
                  Sign up
                </Link>
              </View>
            </View>

            {/* sets android status bar colors, time, wifi, battery */}
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
