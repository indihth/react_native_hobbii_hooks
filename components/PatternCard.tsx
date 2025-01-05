import { useContext } from "react";
import { Pressable } from "react-native";
import { PatternTypeID } from "@/types";
import { RelativePathString, router } from "expo-router";
import { Card } from "react-native-paper";
import { usePathname } from "@/contexts/PathnameContext";

type PatternCardProps = {
  pattern: PatternTypeID;
};

const PatternCard = ({ pattern }: PatternCardProps) => {
  const pathname = usePathname(); // retrieving the current pathname from the context
  const imageURL = "https://api-images-example.s3.eu-north-1.amazonaws.com/";
  const tempImage = require("@/assets/images/placeholderImage.png");

  return (
    <Pressable
      onPress={() =>
        // console.log(`(auth)/(tabs)/${pathname}/[_id]`)
        router.push({
          // dynamic routing, component can be used in different stacks and retain correct navigation
          pathname: `(auth)/(tabs)/${pathname}/[_id]` as RelativePathString,
          params: { _id: pattern._id, pathname: pathname },
        })
      }
    >
      <Card>
        <Card.Title title={pattern.title} subtitle={pattern.description} />
        <Card.Cover
          source={tempImage}
          // source={{
          //   uri: pattern.image_path.length > 0
          //     ? `${imageURL}${pattern.image_path[0]}`
          //     : tempImage,
          // }}
        />
      </Card>
    </Pressable>
  );
};

export default PatternCard;
