import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { axiosPut } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import FormField from "@/components/FormField";

const EditProfile = () => {
  const {
    userId,
    about_me,
    location,
    website_url,
    full_name,
    image_path,
  } = useLocalSearchParams<{
    userId: string;
    about_me: string;
    location: string;
    website_url: string;
    full_name: string;
    image_path: any;
  }>();

  const { session } = useSession();

  const [userIdState, setUserIdState] = useState(userId);
  const [aboutMeState, setAboutMeState] = useState(about_me);
  const [locationState, setLocationState] = useState(location);
  const [websiteUrlState, setWebsiteUrlState] = useState(website_url);
  const [fullNameState, setFullNameState] = useState(full_name);
  const [imagePathState, setImagePathState] = useState(image_path);

  const updateProfile = async () => {
    try {
      const response = await axiosPut(
        `users/${userId}`,
        {
          userId: userIdState,
          about_me: aboutMeState,
          location: locationState,
          website_url: websiteUrlState,
          full_name: fullNameState,
          //   image_path: imagePathState,
        },
        session
      );
      console.log("Profile updated successfully", response.data);


      router.back();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  //   const tempImage = require("@/assets/images/swift.jpg");

  //   setImagePathState(tempImage);

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={updateProfile}>
              <Text>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View className="p-8 border border-gray-200">
        {/* <Image source={imagePathState} /> */}
        <FormField
          title="Full Name"
          value={fullNameState}
          handleChangeText={setFullNameState}
        />
        <FormField
          title="About Me"
          value={aboutMeState}
          handleChangeText={setAboutMeState}
          multiline
          numberOfLines={4} // can go to 4 lines if text is long enough
          className="h-24"
        />
        <FormField
          title="Location"
          value={locationState}
          handleChangeText={setLocationState}
        />
        <FormField
          title="Website URL"
          value={websiteUrlState}
          handleChangeText={setWebsiteUrlState}
        />
      </View>
      {/* <Text>{userId}</Text> */}
    </View>
  );
};

export default EditProfile;
