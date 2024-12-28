import axios from "axios";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useSession } from "@/contexts/AuthContext";
import { API_URL } from "../../config";

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

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
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
    if (form.full_name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please enter a valid name, email and password");
      return;
    }

    setSubmitting(true);
    // regiser user
    axios
      .post(`${API_URL}/users/register`, {
        // can send entire 'form' or use an object for customisation
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        // Can explude fields that shouldn't be sent to server
      })
      .then((response) => {
        setSubmitting(true)
        // One successful registration, log user in
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
              })
              .finally(() => {
                setSubmitting(false);
              });
      })
      .catch((e) => {
        console.log(e.response.data);
        const errorMessage = e.response.data.message;

        if (errorMessage.includes("email_1 dup key")) {
          Alert.alert("Error", "Email address taken, please try another");
          setForm({
            full_name: form.full_name,
            email: "",
            password: form.password,
          });
          setError("Email already exists");
          return;
        } 
        // else if (errorMessage.includes("Invalid email")) {
        //   Alert.alert("Error", "Invalid email format");
        //   setForm({
        //     full_name: form.full_name,
        //     email: "",
        //     password: form.password,
        //   });
        //   setError("Invalid email format");
        // } else if (errorMessage.includes("Invalid password")) {
        //   Alert.alert("Error", "Password must be at least 6 characters");
        //   setForm({
        //     full_name: form.full_name,
        //     email: form.email,
        //     password: "",
        //   });
        //   setError("Invalid password");
        // } else {
        //   Alert.alert("Error", errorMessage);
        //   setError(errorMessage);
        // }

        // reset password field if auth failed
        setForm({ full_name: form.full_name, email: form.email, password: "" });
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
                title="Name"
                value={form.full_name}
                handleChangeText={handleChange("full_name")}
              />
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
                Register
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
