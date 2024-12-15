import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

type DetailElementProps = {
    title: string;
    value: string | undefined;
};

const DetailElement = ({ title, value }: DetailElementProps) => {
    return (
        <View className="flex-row justify-between items-center border-b border-gray-300 py-4">
            <Text variant="bodyMedium">{title}</Text>
            <Text variant="bodyMedium">{value}</Text>
        </View>
    );
};

export default DetailElement;
