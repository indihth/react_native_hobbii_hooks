import { useState, useEffect } from "react";
import { useSession } from "@/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { axiosAuth, axiosPost } from "@/api/axiosInstance";
import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

import { PatternType, YarnTypeID } from "@/types/index";
import { View } from "react-native";
import { StackActions } from "@react-navigation/native";

export default function Page() {
  const router = useRouter();
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState(null);

  const [pattern, setPattern] = useState<PatternType | null>(null);
  const [yarns, setYarns] = useState<YarnTypeID[] | null>(null);
  const [selectedYarn, setSelectedYarn] = useState<string>();
  const [craftValue, setCraftValue] = useState(""); // radio button

  const [form, setForm] = useState<PatternType>({
    title: "",
    description: "",
    craft_type: craftValue,
    suggested_yarn: "",
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


  const handleSubmit = () => {
    console.log(form);

    axiosPost("/patterns", form, session)
      .then((response) => {
        console.log(response);
        // redirects to view pattern, replace removes previous stack, can't go back to 'create'
        router.replace(`/patterns/${response.data.data._id}`);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  };

//   useEffect(() => {
//     // console.log(yarns); // Logs the updated state after the component re-renders
//   }, []); // Dependency array will run this when 'form' changes

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

      <Text>Suggested Yarnssss</Text>
      <Picker
        selectedValue={selectedYarn}
        onValueChange={handleYarnChange} // Update selected yarn when the user selects a new one
      >
        <Picker.Item label="Select a yarn" value={null} />
        {yarns?.map((yarn) => (
          <Picker.Item key={yarn._id} label={yarn.title} value={yarn._id} />
        ))}
      </Picker>
      {/* <TextInput
        placeholder="What yarn?"
        value={form.suggested_yarn}
        onChange={handleChange}
        id="suggested_yarn"
      /> */}

      <Text>{error}</Text>
      <Button onPress={handleSubmit}>Submit</Button>
    </>
  );
}
