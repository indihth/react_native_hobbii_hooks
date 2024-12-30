import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { TextInput, Text } from "react-native-paper";

interface FormFieldProps {
  title: string;
  value: string | undefined;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  keyboardType?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  otherStyles?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  error,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
      <View className={`mb-5 ${otherStyles}`}>
        <TextInput
        label={title}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          error={error ? true : false}
          className={className}
          {...props}
        />
      </View>
  );
};

export default FormField;
