import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import FormField from "@/components/FormField";
import { Picker } from "@react-native-picker/picker";
import { Button, FAB, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosAuthGet, axiosPost } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import { AxiosError, AxiosResponse } from "axios";
import { PatternType, PatternTypeID, YarnTypeID } from "@/types/index";

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

const Create = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  // const [selectedYarn, setSelectedYarn] = useState<YarnTypeID>(null);

  const [yarns, setYarns] = useState<YarnTypeID[]>();
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]);

  const [title, setTitle] = useState("");
  const [craftType, setCraftType] = useState("");
  const [patternId, setPatternId] = useState("");

  const [yarnsUsed, setYarnsUsed] = useState<{
    yarn: string;
    colorway_name: string[];
  }>({
    yarn: "67365b5a27116aa3ae9dc8ea",
    colorway_name: [""],
  });
  const [selectedYarn, setSelectedYarn] = useState<YarnTypeID>(); // Currently selected yarn ID
  const [colorways, setColorways] = useState<string[]>([]); // Available colorways for the selected yarn
  const [selectedColorway, setSelectedColorway] = useState<string>(); // Selected colorway

  // const [description, setDescription] = useState("");
  // const [yarnWeight, setYarnWeight] = useState("");
  // const [gauge, setGauge] = useState("");
  // const [meterage, setMeterage] = useState("");
  const [image, setImage] = useState("");
  // const [image, setImage] = useState("");

  const [form, setForm] = useState({
    title: title,
    craft_type: craftType,
    pattern: patternId,
    yarns_used: {yarn: selectedYarn,
      colorway_name: [selectedColorway],},
    // yarns_used: {yarn: "67365b5a27116aa3ae9dc8ea",
    //   colorway_name: ["Ocean Blue"],},
    // yarns_used: colorwayUsed,
    // description: description,
    // yarn_weight: yarnWeight,
    // gauge: gauge,
    // meterage: meterage,
    // image: image,
  });


  const [error, setError] = useState<ErrorType>({
    title: undefined,
    description: undefined,
    craft_type: undefined,
    suggested_yarn: undefined,
    yarn_weight: undefined,
    gauge: undefined,
    meterage: undefined,
    // image: undefined,
  });

  // Load yarns and patterns for dropdowns
  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all yarns
    axiosAuthGet(`/yarns`, session)
      .then((response) => {
        setYarns(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });

    // API call to get all patterns
    axiosAuthGet(`/patterns`, session)
      .then((response) => {
        setPatterns(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleYarnChange = (value: string) => {
    console.log(value)
    // setColorways(form.yarns_used.colorway_name)

    setSelectedYarn(value);
    // setSelectedColorway(""); // Reset colorway when yarn changes
    const selectedYarn = yarns?.find((yarn) => yarn._id === value);
      if (selectedYarn) {
        setColorways(selectedYarn.colorways);
      }
  };

  // Higher-order function, passing in a field name to dynamically set the state
  const handleChange = (field: string) => (value: string) => { // field to ProjectType later
    setForm((prevState) => ({
      ...prevState, // takes what is already in form (spread operator)
      [field]: value, // target.id is web only, use field name instead for android
    }));
  };

  const handleColorwayChange = (colorway: string) => {
    setSelectedColorway(colorway);
  };

  const addYarnUsed = () => {
    if (selectedYarn && selectedColorway) {
      setYarnsUsed((prev) => [
        ...prev,
        { yarn: selectedYarn, colorway_name: [selectedColorway] },
      ]);
      // setSelectedYarn(null); // Reset selection
      // setSelectedColorway("");
      // setColorways([]); // Clear available colorways
    }
  };

  const handleSubmit = async () => {
    // addYarnUsed();
  form.yarns_used.yarn = selectedYarn;
  form.yarns_used.colorway_name = [selectedColorway];
  
    // console.log(`form ${JSON.stringify(form)}`)
    // console.log(form)
    try {
      const response = await axiosPost("/projects", form, session);

      router.replace(`(auth)/(tabs)/feed/${response.data.data._id}` as any); // type error
      // console.log(response.data._id)

      console.log("Project created successfully", response.data.data);
    } catch (error) {
      console.error("Error creating project", error);
    }

    // .then((response: AxiosResponse<{ data: PatternTypeID }>) => {
    //   console.log(response);
    //   router.dismiss();
    //   // router.replace(`/patterns/${response.data.data._id}`);
    // })
    // .catch((e: AxiosError) => {
    //   console.log(e);
    //   // console.log(response.data);
    // });
  };

  const handleCancel = () => {
    // router.back()
    Alert.alert("Are you sure you want to cancel?", "", [
      {
        text: "Discard",
        style: "destructive",
        onPress: () => router.dismiss(),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <SafeAreaView className="flex-1 mx-5 mt-5">
          <FormField
            title="Title"
            value={form.title}
            handleChangeText={handleChange("title")}
            error={error.title}
          />
          {error.title && <Text style={{ color: "red" }}>{error.title}</Text>}
          {/* <FormField
            title="Description"
            value={description}
            handleChangeText={setDescription}
            error={error.description}
            multiline={true}
            numberOfLines={4}
          />
          {error.description && (
            <Text style={{ color: "red" }}>{error.description}</Text>
          )} */}
          <Text>Craft Type</Text>

          <RadioButton.Group
            onValueChange={handleChange("craft_type")}
            value={form.craft_type}
          >
            <RadioButton.Item label="Crochet" value="crochet" />
            <RadioButton.Item label="Knitting" value="knitting" />
          </RadioButton.Group>
          {error.craft_type && (
            <Text style={{ color: "red" }}>{error.craft_type}</Text>
          )}
          <Text>Yarns Used</Text>
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
          {colorways.length > 0 && (
            <View>
              <Text>Colorway</Text>
              <Picker
                selectedValue={selectedColorway}
                onValueChange={handleColorwayChange} 
              >
                <Picker.Item label="Select colorway" value={null} />
                {colorways.map((colorway: string) => (
                  <Picker.Item
                    key={colorway}
                    label={colorway}
                    value={colorway}
                  />
                ))}
              </Picker>
              {error.suggested_yarn && (
                <Text style={{ color: "red" }}>{error.suggested_yarn}</Text>
              )}
            </View>
          )}

          <Text>Pattern Used</Text>
          <Picker
            selectedValue={patternId}
            onValueChange={handleChange("pattern")} // Update selected yarn when the user selects a new one
          >
            <Picker.Item label="Select a yarn" value={null} />
            {patterns?.map((pattern: PatternType) => (
              <Picker.Item
                key={pattern._id}
                label={pattern.title}
                value={pattern._id}
              />
            ))}
          </Picker>
          {error.suggested_yarn && (
            <Text style={{ color: "red" }}>{error.suggested_yarn}</Text>
          )}
          {/* <FormField
            title="Yarn Weight"
            value={yarnWeight}
            handleChangeText={setYarnWeight}
            error={error.yarn_weight}
          />
          {error.yarn_weight && (
            <Text style={{ color: "red" }}>{error.yarn_weight}</Text>
          )} */}
          {/* <FormField
            title="Gauge"
            value={gauge} // don't understand why theres a type error
            handleChangeText={setGauge}
            error={error.gauge}
          />
          {error.gauge && <Text style={{ color: "red" }}>{error.gauge}</Text>} */}

          {/* <FormField
            title="Meterage" // Add new FormField for meterage
            value={meterage}
            handleChangeText={setMeterage}
            error={error.meterage}
          />
          {error.meterage && (
            <Text style={{ color: "red" }}>{error.meterage}</Text>
          )} */}

          {/* <View>
            {form.image ? (
              <View>
                <Image
                  source={{ uri: image[0].uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
               
                <Button onPress={pickImageAsync}>Change image</Button>
                <Button onPress={(e) => setForm({ ...form, image: "" })}>
                  X
                </Button>
              </View>
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Button onPress={pickImageAsync}>Choose an image</Button>
              </View>
            )}
          </View> */}

          <Button onPress={addYarnUsed}>Add Yarn</Button>
          <Button onPress={handleSubmit}>Submit</Button>
          <View className="flex-1 items-end">
            <FAB
              icon={"plus"}
              size="medium"
              variant="primary"
              onPress={() => Alert.alert("Add another yarn")}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Create;
