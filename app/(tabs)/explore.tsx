import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const background = require("@/assets/images/pastelBG.jpeg");

// Components
import { Button } from 'react-native-paper';
import { useSession } from "@/contexts/AuthContext";
import LoginForm from "../../components/LoginForm";
import { StatusBar } from "expo-status-bar";

const Landing = () => {
  const { session, signOut } = useSession();


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
              {session ? (
                  <Button onPress={signOut} mode="contained">
                    Logout
                  </Button>
                ) : (
                  <LoginForm />
                )}
            </View>

            {/* sets android status bar colors, time, wifi, battery */}
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Landing;
