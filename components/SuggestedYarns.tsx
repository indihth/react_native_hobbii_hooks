import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import React from "react";
import DetailElement from "./DetailElement";
import { SuggestedYarn } from "../types";
import { Link } from "expo-router";

type Props = {
  suggested_yarn: SuggestedYarn | undefined;
};
const SuggestedYarns: React.FC<Props> = ({ suggested_yarn }) => {
  return (
    <View className="py-4">
      <Text variant="titleMedium" className="pb-3">
        Suggested Yarns
      </Text>
      <Text variant="bodyLarge">{suggested_yarn?.title}</Text>
      {suggested_yarn?.fibers.map((fiber, index) => (
        <DetailElement
          key={index}
          title={fiber.fiber_name}
          value={`${fiber.percentage}%`}
        />
      ))}
      {/* <Button><Link href={{ 
                pathname: '/yarns/[_id]',
                params: { id: suggested_yarn?._id }
            }}>View Yarn</Link></Button> */}
      <Link push href={`/yarns/${suggested_yarn?._id}`} asChild>
        <Button>View Yarn</Button>
      </Link>
    </View>
  );
};

export default SuggestedYarns;
