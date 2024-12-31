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
  
  const [selectedYarn, setSelectedYarn] = useState(null);
  const [yarns, setYarns] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [craftType, setCraftType] = useState("");
  const [suggestedYarn, setSuggestedYarn] = useState("");
  const [yarnWeight, setYarnWeight] = useState("");
  const [gauge, setGauge] = useState("");
  const [meterage, setMeterage] = useState("");
  const [image, setImage] = useState("");

  const [form, setForm] = useState({
    title: title,
    description: description,
    craft_type: craftType,
    suggestedYarn: suggestedYarn,
    yarn_weight: yarnWeight,
    gauge: gauge,
    meterage: meterage,
    image: image,
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

  const handleSubmit = async () => {

    const formNew = setForm({
      title: title,
      description: description,
      craft_type: craftType,
      suggestedYarn: suggestedYarn,
      yarn_weight: yarnWeight,
      gauge: gauge,
      meterage: meterage,
      image: image,
    });
    // console.log(`formNew: ${formNew}`);


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("craft_type", craftType);
    formData.append("suggested_yarn", suggestedYarn);
    formData.append("yarn_weight", yarnWeight);
    formData.append("gauge", gauge);
    formData.append("meterage", meterage);
    // if (form.image) {
    //   formData.append("image", {
    //     uri: form.image,
    //     name: "photo.jpg",
    //     type: "image/jpeg",
    //   });
    // }

    // console.log(`suggested yarn: ${formData}`);
  
    try {
      const response = await axiosPost("/patterns", formData, session);

      router.replace(`feed/${response.data.data._id}` as any); // type error
      // console.log(response.data._id)

      console.log("Pattern created successfully", response.data.data._id);
    } catch (error) {
      console.error("Error creating pattern", error);
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
            value={title}
            handleChangeText={setTitle}
            error={error.title}
          />
          {error.title && <Text style={{ color: "red" }}>{error.title}</Text>}
          <FormField
            title="Description"
            value={description}
            handleChangeText={setDescription}
            error={error.description}
            multiline={true}
            numberOfLines={4}
          />
          {error.description && (
            <Text style={{ color: "red" }}>{error.description}</Text>
          )}
          <Text>Craft Type</Text>

          <RadioButton.Group onValueChange={setCraftType} value={craftType}>
            <RadioButton.Item label="Crochet" value="crochet" />
            <RadioButton.Item label="Knitting" value="knitting" />
            {/* <View>
            <Text>Crochet</Text>
            <RadioButton value="crochet" />
          </View>
          <View>
            <Text>Knitting</Text>
            <RadioButton value="knitting" />
          </View> */}
          </RadioButton.Group>
          {error.craft_type && (
            <Text style={{ color: "red" }}>{error.craft_type}</Text>
          )}
          <Text>Suggested Yarns</Text>
          <Picker
            selectedValue={selectedYarn}
            onValueChange={setSuggestedYarn} // Update selected yarn when the user selects a new one
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
            value={yarnWeight}
            handleChangeText={setYarnWeight}
            error={error.yarn_weight}
          />
          {error.yarn_weight && (
            <Text style={{ color: "red" }}>{error.yarn_weight}</Text>
          )}
          <FormField
            title="Gauge"
            value={gauge} // don't understand why theres a type error
            handleChangeText={setGauge}
            error={error.gauge}
          />
          {error.gauge && <Text style={{ color: "red" }}>{error.gauge}</Text>}

          <FormField
            title="Meterage" // Add new FormField for meterage
            value={meterage}
            handleChangeText={setMeterage}
            error={error.meterage}
          />
          {error.meterage && (
            <Text style={{ color: "red" }}>{error.meterage}</Text>
          )}

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
