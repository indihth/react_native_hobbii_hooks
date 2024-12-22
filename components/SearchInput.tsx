import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Icon } from "react-native-paper";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  const pathname = usePathname();

  const handlePress = () => {
    if (query === "")
      return Alert.alert("No search term", "Please input a search term");


  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 focus:border-secondary">
      <TextInput
        value={query}
        placeholder="Search for a pattern"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={handlePress} // if the user presses enter on a keyboard
      />

      <TouchableOpacity onPress={handlePress}>
        <Icon source="search" size={20} color="#CDCDE0" />
        {/* <Image source={icons.search} className="w-5 h-5" resizeMode="contain" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
