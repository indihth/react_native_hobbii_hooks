import { useState, useEffect } from "react";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { axiosAuthGet, axiosPost, axiosPut } from "@/api/axiosInstance";
import { Button, Text, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { PatternType, PatternTypeID, YarnTypeID } from "@/types/index";
import { Alert, ScrollView, View, Image, Platform } from "react-native";
import { AxiosError, AxiosResponse } from "axios";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "@/components/LoadingIndicator";

type ErrorType = {
  title?: string;
  description?: string;
  craft_type?: string;
  suggested_yarn?: string;
  yarn_weight?: string;
  gauge?: string;
  meterage?: string;
  image?: string;
};

export default function Page() {
  const router = useRouter();
  const { session } = useSession();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const [pattern, setPattern] = useState<PatternType | null>(null);
  const [yarns, setYarns] = useState<YarnTypeID[] | null>(null);
  const [selectedYarn, setSelectedYarn] = useState<string>();
  const [craftValue, setCraftValue] = useState<string | null>(null); // radio button
  const [image, setImage] = useState<any[]>([]); // type later


  const [form, setForm] = useState<PatternType>({
    title: pattern?.title || "",
    description: pattern?.description || "",
    craft_type: pattern?.craft_type || "",
    suggested_yarn: pattern?.suggested_yarn || undefined,
    yarn_weight: pattern?.yarn_weight || "",
    gauge: pattern?.gauge || "",
    meterage: pattern?.meterage || "", // Add meterage to form state
    image: pattern?.image || undefined, // type error
  });

  const [error, setError] = useState<ErrorType>({
    title: "",
    description: "",
    craft_type: "",
    suggested_yarn: "",
    yarn_weight: "",
    gauge: "",
    meterage: "", // Add meterage to error state
    // image: "",
  });

  // Load yarns for dropdown
  useEffect(() => {
    // setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuthGet(`/yarns`, session)
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

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed
    if (id) {
      // Fetch the pattern details using the id
      axiosAuthGet(`/patterns/${id}`, session)
        .then((response) => {
          setPattern(response.data.data);
          setForm({
            title: response.data.data.title,
            description: response.data.data.description,
            craft_type: response.data.data.craft_type,
            suggested_yarn: response.data.data.suggested_yarn,
            yarn_weight: response.data.data.yarn_weight,
            gauge: response.data.data.gauge,
            meterage: response.data.data.meterage, // Set meterage from response
            // image: response.data.data.image,
          });
          setSelectedYarn(response.data.data.suggested_yarn?._id); // Set the selected yarn
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [id, session]);

  // Higher-order function, passing in a field name to dynamically set the state
  const handleChange = (field: keyof PatternType) => (value: string) => {
    setForm((prevState: PatternType) => ({
      ...prevState, // takes what is already in form (spread operator)
      [field]: value, // target.id is web only, use field name instead for android
    }));
  };

  //   Radio button handled separately
  const handleRadioChange = (value: string) => {
    setForm((prevState: PatternType) => ({
      ...prevState,
      craft_type: value,
    }));
  };

  const handleYarnChange = (value: string) => {
    const selectedYarn = yarns?.find((yarn) => yarn._id === value);
    setForm((prevState: PatternType) => ({
      ...prevState,
      suggested_yarn: selectedYarn,
    }));
  };

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*", // allows any image file
    });

    if (!result.canceled) {
      // image expects an array of strings, store the uri to an array

      // creates new filename based on current time with original file extension
      const uriParts = result.assets[0].uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const filename = new Date().getTime() + "." + fileType;

      setForm((prevState: PatternType) => ({
        ...prevState,
        image: [result.assets[0].uri],
      }));

      // setForm({ ...form, image: [result.assets[0].uri] });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  // Select image file and update form state with uri
 const pickImageAsync = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: false,
      // includeBase64: false
    });

    if (!result.canceled) {
      // use spread operator and appends the image array to add multiple images
      // setForm({ ...form, image: result.assets[0].uri });
      setImage(result.assets);
      console.log(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const validate = () => {
    let hasError = false;
    let newError: ErrorType = {};

    // Iterate over each key in the form object and set an error if the field is empty
    const requiredFields = [
      "title",
      "description",
      "craft_type",
      "suggested_yarn",
      "yarn_weight",
      "gauge",
      "meterage",
      // "image",
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newError[field as keyof ErrorType] = "Field is required";
        hasError = true;
      }
    });

    setError(newError);
    return hasError;
  };

  const handleSubmit = async () => {
    // if (validate()) {
    //   Alert.alert("Please fill out all required fields");
    //   return;
    // }

    // let formData = new FormData();
    // formData.append("title", form.title);
    // formData.append("description", form.description);
    // formData.append("craft_type", form.craft_type);
    // formData.append("suggested_yarn", form.suggested_yarn);
    // formData.append("yarn_weight", form.yarn_weight);
    // formData.append("gauge", form.gauge);
    // formData.append("meterage", form.meterage);

    // // Append image to form data, first convert to blob
    // const imageUri =
    //   Platform.OS === "android"
    //     ? image[0].uri
    //     : image[0].uri.replace("file://", "");
    // const response = await fetch(imageUri);
    // const blob = await response.blob();
    // formData.append("image", blob, image[0].filename);

    console.log(form);
    setLoading(true);

    axiosPut(`/patterns/${id}`, form, session)
      .then((response: AxiosResponse<{ data: PatternTypeID }>) => {
        // .then((response) => {
        console.log(response);
        setLoading(false);
        // redirects to view pattern, replace removes previous stack, can't go back to 'create'
        router.replace(`/patterns/${id}`);
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log(form); // Logs the updated state after the component re-renders
  // }, [form.image]); // Dependency array will run this when 'form' changes

  if (loading || !pattern) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 mx-5">
        <FormField
          title="Title"
          value={form.title}
          handleChangeText={handleChange("title")}
        />
        {/* {error.title && <Text style={{ color: "red" }}>{error.title}</Text>} */}
        <FormField
          title="Description"
          value={form.description}
          handleChangeText={handleChange("description")}
        />
        {/* {error.description && (
          <Text style={{ color: "red" }}>{error.description}</Text>
        )} */}
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
        {/* {error.craft_type && (
          <Text style={{ color: "red" }}>{error.craft_type}</Text>
        )} */}
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
        {/* {error.suggested_yarn && (
          <Text style={{ color: "red" }}>{error.suggested_yarn}</Text>
        )} */}
        <FormField
          title="Yarn Weight"
          value={form.yarn_weight}
          handleChangeText={handleChange("yarn_weight")}
        />
        {/* {error.yarn_weight && (
          <Text style={{ color: "red" }}>{error.yarn_weight}</Text>
        )} */}
        <FormField
          title="Gauge"
          value={form.gauge} // don't understand why theres a type error
          handleChangeText={handleChange("gauge")}
        />
        {/* {error.gauge && <Text style={{ color: "red" }}>{error.gauge}</Text>} */}
        <FormField
          title="Meterage" // Add new FormField for meterage
          value={form.meterage}
          handleChangeText={handleChange("meterage")}
        />
        {/* {error.meterage && (
          <Text style={{ color: "red" }}>{error.meterage}</Text>
        )} */}

        {/* <View>
          {form.image ? (
            <View>
              <Image
                source={{ uri: form.image[0] }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
              <Button onPress={pickImageAsync}>Change image</Button>
              <Button onPress={(e) => setForm({ ...form, image: undefined })}>
                X
              </Button>
            </View>
          ) : (
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
              <Button onPress={pickImageAsync}>Choose an image</Button>
            </View>
          )}
        </View> */}
        {/* <Image source={{ uri: form.image }} className="w-full h-30 rounded-2xl"  /> */}

        {/* <Text>{error}</Text> */}
        <Button onPress={handleSubmit}>Submit</Button>
      </SafeAreaView>
    </ScrollView>
  );
}
