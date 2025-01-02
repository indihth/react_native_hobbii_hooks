import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import React from "react";
import DetailElement from "./DetailElement";
import { YarnTypeID, FiberType } from "../types";
import { Link } from "expo-router";

type Props = {
  yarn?: YarnTypeID | undefined;
};
const YarnDetails: React.FC<Props> = ({ yarn = undefined }) => {
  // console.log(yarn);
  return (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Suggested Yarns
      </Text>
      {yarn ? (
      <View className="py-4">
        <Text variant="titleSmall">{yarn?.title}</Text>
        {yarn?.fibers?.map((fiber: FiberType, index: number) => (
          <DetailElement
            key={index}
            title={fiber.fiber_name}
            value={`${fiber.percentage}%`}
          />
        ))}
        <Link push href={`/yarns/${yarn?._id}`} asChild>
          <Button>View Yarn</Button>
        </Link>
      </View>

      ): (
        <Text>No yarns added yet</Text>
      )}
    </View>
  );
};

export default YarnDetails;
