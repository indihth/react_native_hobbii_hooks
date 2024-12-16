import { useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import React from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const LoadingIndicator = () => (
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
  );

  return { loading, setLoading, LoadingIndicator };
};

export default useLoading;
