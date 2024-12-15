import { useState, useEffect } from "react";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { axiosAuth, axiosPost } from "@/api/axiosInstance";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { PatternType, PatternTypeID, YarnTypeID } from "@/types/index";
import { Alert, ScrollView, View, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import { AxiosError, AxiosResponse } from "axios";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";

type ErrorType = {
  title?: string;
  description?: string;
  craft_type?: string;
  suggested_yarn?: string;
  yarn_weight?: string;
  gauge?: string;
  meterage?: string;
  image_path?: string;
};

export default function Page() {
  const router = useRouter();
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const [pattern, setPattern] = useState<PatternType | null>(null);
  const [yarns, setYarns] = useState<YarnTypeID[] | null>(null);
  const [selectedYarn, setSelectedYarn] = useState<string>();
  const [craftValue, setCraftValue] = useState<string | null>(null); // radio button
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    craft_type: "",
    suggested_yarn: "",
    yarn_weight: "",
    gauge: "",
    image_path: "",
    // image_path: null as DocumentPicker.DocumentPickerAsset | null,
  });

  const [error, setError] = useState<ErrorType>({
    title: "",
    description: "",
    craft_type: "",
    suggested_yarn: "",
    yarn_weight: "",
    gauge: "",
    meterage: "",
    image_path: "",
  });

  // Load yarns for dropdown
  useEffect(() => {
    // setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuth(`/yarns`, session)
      .then((response) => {
        setYarns(response.data);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  // const handleChange = (field: string) => (value: string) => {
  //   setForm((prevState) => ({
  //     ...prevState, // takes what is already in form (spread operator)
  //     [field]: value, // target.id is web only, use field name instead for android
  //   }));
  // };

  // Higher-order function, passing in a field name to dynamically set the state
  const handleChange = (field: keyof PatternType) => (value: string) => {
    setForm((prevState) => ({
      ...prevState, // takes what is already in form (spread operator)
      [field]: value, // target.id is web only, use field name instead for android
    }));
  };

  //   Radio button handled separately
  const handleRadioChange = (value: string) => {
    setForm((prevState) => ({
      ...prevState,
      craft_type: value,
    }));
  };

  const handleYarnChange = (value: string) => {
    // setSelectedYarn(value); // Update the selected yarn's id
    setForm((prevState) => ({
      ...prevState,
      suggested_yarn: value,
    }));
  };

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*", // allows any image file
    });

    if (!result.canceled) {
      setForm({ ...form, image_path: result.assets[0].uri });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  }

    // Select image file and update form state with uri
    const pickImageAsync = async (): Promise<void> => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // use spread operator and appends the image_path array to add multiple images
        // setForm((prevState) => ({
        //   ...prevState,
        //   // Uses previous state if already exists, if not use an empty array (fixes type error)
        //   image_path: [...(prevState.image_path || []), ...result.assets.map((asset) => asset.uri)],
        // }));
        console.log(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    };

    const validate = () => {
      let hasError = false;
      let newError: ErrorType = {};

      // Iterate over each key in the form object and set an error if the field is empty
      Object.keys(form).forEach((key) => {
        if (!form[key as keyof PatternType]) {
          newError[key as keyof ErrorType] = "Field is required";
          hasError = true;
        }
      });

      setError(newError);
      return hasError;
    };

    const handleSubmit = () => {
      if (validate()) {
        return;
      }
      console.log(form);

      axiosPost("/patterns", form, session)
        .then((response: AxiosResponse<{ data: PatternTypeID }>) => {
          // .then((response) => {
          console.log(response);
          // redirects to view pattern, replace removes previous stack, can't go back to 'create'
          router.replace(`/patterns/${response.data.data._id}`);
        })
        .catch((e: AxiosError) => {
          console.log(e.message);
        });
    };

    useEffect(() => {
      console.log(form); // Logs the updated state after the component re-renders
    }, [form.image_path]); // Dependency array will run this when 'form' changes

    if (loading === true) return <Text>Loading API...</Text>;

    return (
      <ScrollView>
        <SafeAreaView className="flex-1 mx-5">
          <FormField
            title="Title"
            value={form.title}
            handleChangeText={handleChange("title")}
          />
          {error.title && <Text style={{ color: "red" }}>{error.title}</Text>}
          <FormField
            title="Description"
            value={form.description}
            handleChangeText={handleChange("description")}
          />
          {error.description && (
            <Text style={{ color: "red" }}>{error.description}</Text>
          )}
          <Text>Craft Type</Text>
          <RadioButton.Group
            onValueChange={handleRadioChange}
            value={form.craft_type}
          >
            <View>
              <Text>Crochet</Text>
              <RadioButton value="crochet" />
            </View>
            <View>
              <Text>Knitting</Text>
              <RadioButton value="knitting" />
            </View>
          </RadioButton.Group>
          {error.craft_type && (
            <Text style={{ color: "red" }}>{error.craft_type}</Text>
          )}
          <Text>Suggested Yarns</Text>
          <Picker
            selectedValue={selectedYarn}
            onValueChange={handleYarnChange} // Update selected yarn when the user selects a new one
          >
            <Picker.Item label="Select a yarn" value={null} />
            {yarns?.map((yarn) => (
              <Picker.Item key={yarn._id} label={yarn.title} value={yarn._id} />
            ))}
          </Picker>
          {error.suggested_yarn && (
            <Text style={{ color: "red" }}>{error.suggested_yarn}</Text>
          )}
          <FormField
            title="Yarn Weight"
            value={form.yarn_weight}
            handleChangeText={handleChange("yarn_weight")}
          />
          {error.yarn_weight && (
            <Text style={{ color: "red" }}>{error.yarn_weight}</Text>
          )}
          <FormField
            title="Gauge"
            value={form.gauge} // don't understand why theres a type error
            handleChangeText={handleChange("gauge")}
          />
          {error.gauge && <Text style={{ color: "red" }}>{error.gauge}</Text>}

          <View>
            {form.image_path ? (
              <View>
                {/* <Image
                  source={{ uri: form.image_path.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                /> */}
                <Text>{form.image_path}</Text>
                <Button onPress={openPicker}>Change image</Button>
                <Button onPress={(e) => setForm({ ...form, image_path: null})}>X</Button>
              </View>
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                {/* <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text> */}
                <Button onPress={openPicker}>Choose an image</Button>
              </View>
            )}
          </View>
          {/* <Image source={{ uri: form.image_path }} className="w-full h-30 rounded-2xl"  /> */}

          {/* <Text>{error}</Text> */}
          <Button onPress={handleSubmit}>Submit</Button>
        </SafeAreaView>
      </ScrollView>
    );
  };
