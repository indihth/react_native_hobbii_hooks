import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { IconButton } from "react-native-paper";
import { axiosPostFav, axiosAuthGet, axiosDelete } from "@/api/axiosInstance";
import { Alert } from "react-native";
import { router } from "expo-router";

interface FavouriteButtonProps {
  resourceName: string;
  id: string;
  session: string | null | undefined;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  resourceName,
  id,
  session,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

  useEffect(() => {
    const checkIfFavourited = async () => {
      try {
        setIsLoading(true);
        // console.log("Checking if favourited:", resourceName, id);
        const response = await axiosAuthGet(
          `/${resourceName}/favourites`,
          session
        );

        const isFavourited = response.data.some(
          (item: { _id: string }) => item._id === id
        );
        setIsSelected(isFavourited);
        setIsLoading(false);

        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Failed to check if favourited:", error);
      }
    };

    checkIfFavourited();
  }, [resourceName, id, session]);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Final opacity value of 1
        duration: 600, // Duration of the animation in milliseconds
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim]);

  const toggleFavourite = async () => {
    const originalSelected = isSelected;
    console.log("toggled favoutite:");

    // Toggling axios call based on current favourite status
    let axoisCall = isSelected ? axiosDelete : axiosPostFav;

    try {
      setIsSelected(!isSelected); // Immediately toggle the button for better UX, give error later if fails
      //   const response = await axois("httpstatus.us/404"); // testing error handling
      const response = await axoisCall(
        `/${resourceName}/${id}/favourite`,
        session
      );
      console.log("Response:", response.data);
    } catch (error) {
      // toggle button status back if fails
      setIsSelected(originalSelected);
      console.log("untoggled favoutite:");
      Alert.alert("Error", "Failed to favourite resource");
      console.error("Failed to favourite resource:", error);
    }
  };

  return (
    // only rendering after favourite status is checked
    !isLoading && (
      <Animated.View style={{ opacity: fadeAnim }}>
        <IconButton
          icon={isSelected ? "heart" : "heart-outline"}
          onPress={toggleFavourite}
          mode="contained"
          size={30}
          style={{ margin: 10, padding: 4 }}
        />
      </Animated.View>
    )
  );
};

export default FavouriteButton;
function axois(arg0: string) {
  throw new Error("Function not implemented.");
}
