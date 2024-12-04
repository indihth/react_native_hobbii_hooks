import { useState, useEffect } from "react";
import { useSession } from "@/contexts/AuthContext";
import axios from "axios";
import { StyleSheet } from "react-native";

// Paper Components
import { Button, TextInput, Text } from "react-native-paper";

import { API_URL } from "../config";

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
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  return (
    <>
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
    </>
  );
}
