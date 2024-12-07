import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


const Patterns = () => {
    return (
        <SafeAreaView className="flex-1 justify-center">
        <View className="flex-1 justify-center">
          <Text className="text-center ">Search patterns</Text>
        </View>
      </SafeAreaView>
    );
}

export default Patterns;
