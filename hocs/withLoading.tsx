import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import useLoading from "@/hooks/useLoading";

const withLoading = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { loading, setLoading } = useLoading();

    if (loading) {
      return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
    }

    return <WrappedComponent {...props} setLoading={setLoading} />;
  };
};

export default withLoading;
