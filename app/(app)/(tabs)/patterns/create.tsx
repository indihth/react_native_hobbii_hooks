import { useState, useEffect } from "react";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { axiosAuth, axiosPost } from "@/api/axiosInstance";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { PatternType, PatternTypeID, YarnTypeID } from "@/types/index";
import { View } from "react-native";
import { StackActions } from "@react-navigation/native";
import { AxiosError, AxiosResponse } from "axios";

export default function Page() {
  const router = useRouter();
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<AxiosError | string >("");

  const [pattern, setPattern] = useState<PatternType | null>(null);
  const [yarns, setYarns] = useState<YarnTypeID[] | null>(null);
  const [selectedYarn, setSelectedYarn] = useState<string>();
  const [craftValue, setCraftValue] = useState<string | null>(null); // radio button
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState<PatternType>({
    title: "",
    description: "",
    craft_type: "",
    suggested_yarn: "",
    yarn_weight: "",
    gauge: "",
    meterage: undefined,
    image_path: [],
  });

  // Load yarns for dropdown
  useEffect(() => {
    // setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuth(`/yarns`, session)
      .then((response) => {
        setYarns(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    // console.log(form)
  };

  //   Radio button handled seperately
  const handleRadioChange = (newValue: string) => {
    setForm((prevState) => ({
      ...prevState,
      craft_type: newValue,
    }));
  };

  const handleYarnChange = (value: string) => {
    // setSelectedYarn(value); // Update the selected yarn's id
    setForm((prevState) => ({
      ...prevState,
      suggested_yarn: value,
    }));
  };

  // Select image file and update form state with uri
  const pickImageAsync = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
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

  const handleSubmit = () => {
    console.log(form);

    axiosPost("/patterns", form, session)
      .then((response: AxiosResponse<{ data: PatternTypeID }>) => {
        // .then((response) => {
        console.log(response);
        // redirects to view pattern, replace removes previous stack, can't go back to 'create'
        router.replace(`/patterns/${response.data.data._id}`);
      })
      .catch((e: AxiosError) => {
        console.log(e);
        setError(e);
      });
  };

    useEffect(() => {
      console.log(form); // Logs the updated state after the component re-renders
    }, [form.image_path]); // Dependency array will run this when 'form' changes

  if (loading === true) return <Text>Loading API...</Text>;

  return (
    <>
      <Text>Title</Text>
      <TextInput
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        id="title"
      />

      <Text>Description</Text>
      <TextInput
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        id="description"
      />

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
      {/* <TextInput
        placeholder="Crochet or Knitting?"
        value={form.craft_type}
        onChange={handleChange}
        id="craft_type"
      /> */}

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

      <TextInput
        placeholder="What yarn weight?"
        value={form.yarn_weight}
        onChange={handleChange}
        id="yarn_weight"
      />

      <TextInput
        placeholder="What is the gauge?"
        value={form.gauge}
        onChange={handleChange}
        id="gauge"
      />

      <Button onPress={pickImageAsync}>Choose an image</Button>

      {/* <Text>{error}</Text> */}
      <Button onPress={handleSubmit}>Submit</Button>
    </>
  );
}
