import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosAuthGet } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import { PatternType, PatternTypeID, YarnTypeID } from "@/types/index";
import { formatStatus } from "@/utils/formatStatus";

// Components
import FormField from "@/components/FormField";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Button, FAB, RadioButton } from "react-native-paper";

type ProjectFormProps = {
  initialFormData: FormType;
  handleSubmit: (form: FormType) => void;
  isEditMode?: boolean;
};

type ErrorType = {
  title?: string;
  status?: string;
  craft_type?: string;
  pattern?: string;
  yarns_used?: {
    yarn?: string;
    colorway_name?: string;
  };
  project_notes?: string;
  made_for?: string;
  needle_size?: string;
  yarn_weight?: string;
  started_date?: string;
  completed_date?: string;
};

type FormType = {
  title: string;
  status?: string;
  craft_type: string;
  pattern: string;
  yarns_used: {
    yarn: string;
    colorway_name: string[];
  };
  made_for?: string;
  project_notes?: string;
  needle_size?: string;
  yarn_weight?: string;
  started_date?: string; // db stores as string, not date
  completed_date?: string; // db stores as string, not date
};

const ProjectForm = ({
  initialFormData,
  handleSubmit,
  isEditMode = false,
}: ProjectFormProps) => {
  const { session } = useSession();
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [form, setForm] = useState<FormType>(initialFormData);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date(form.started_date || Date.now())
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date(form.completed_date || Date.now())
  );
  const [yarns, setYarns] = useState<YarnTypeID[]>();
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]);
  const [selectedYarn, setSelectedYarn] = useState<string>(
    initialFormData.yarns_used.yarn
  );
  const [colorways, setColorways] = useState<string[]>([]);
  const [selectedColorway, setSelectedColorway] = useState<string>(
    initialFormData.yarns_used.colorway_name[0]
  ); // needed?
  const [error, setError] = useState<ErrorType>({});
  const needleSizeOptions = [
    "1.5mm",
    "2mm",
    "2.5mm",
    "3mm",
    "3.5mm",
    "4mm",
    "4.5mm",
    "5mm",
    "6mm",
    "7mm",
    "8mm",
    "9mm",
    "10mm",
    "11mm",
    "12mm",
  ];

  useEffect(() => {
    // fetching yarn and pattern data for populating form dropdowns
    const fetchData = async () => {
      try {
        // Promise.all takes array and waits for all promises to resolve before returning
        const [yarnsResponse, patternsResponse] = await Promise.all([
          axiosAuthGet(`/yarns`, session),
          axiosAuthGet(`/patterns`, session),
        ]);
        setYarns(yarnsResponse.data);
        setPatterns(patternsResponse.data);

        const usedYarn = yarnsResponse.data?.find(
          (yarn: YarnTypeID) => yarn._id === initialFormData.yarns_used.yarn
        );

        if (usedYarn) {
          setColorways(usedYarn.colorways);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleYarnChange = (value: string) => {
    setSelectedYarn(value);

    // All available colorways not included in the project data, must get from yarns array. Match yarn id from project to get colorway options
    const selectedYarn = yarns?.find((yarn) => yarn._id === value);
    if (selectedYarn) {
      setColorways(selectedYarn.colorways);
    }
    setForm((prevState) => ({
      ...prevState,
      yarns_used: {
        ...prevState.yarns_used,
        yarn: value,
      },
    }));
  };

  const handleColorwayChange = (colorway: string) => {
    setSelectedColorway(colorway);
    setForm((prevState) => ({
      ...prevState,
      yarns_used: {
        ...prevState.yarns_used,
        colorway_name: [colorway],
      },
    }));
  };

  const handleChange = (field: string) => (value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  //   Handles date picker (onChange needed for Android)
  const onChangeDate = (
    event: any,
    selectedDate?: Date,
    isStartDate: boolean = false // reduce need for two similar functions
  ) => {
    if (event.type === "set") {
      const currentDate = selectedDate;

      // Store date as string in form
      setForm((prevState) => ({
        ...prevState,
        [isStartDate ? "started_date" : "completed_date"]:
          currentDate?.toISOString() || "", // store as simplified extended ISO format, can display in local format later
      }));

      if (currentDate) {  // use state to store as Date object for displaying in DateTimePicker
        isStartDate
          ? setSelectedStartDate(currentDate)
          : setSelectedEndDate(currentDate); 
      }
    }
  };

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    onChangeDate(event, selectedDate, true);
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    onChangeDate(event, selectedDate, false);
  };

  const showMode = (currentMode: "date" | "time", isStartDate: boolean) => {
    DateTimePickerAndroid.open({
      value: isStartDate
        ? selectedStartDate || new Date()
        : selectedEndDate || new Date(),
      onChange: isStartDate ? onChangeStartDate : onChangeEndDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showStartDatepicker = () => {
    showMode("date", true);
  };

  const showEndDatepicker = () => {
    showMode("date", false);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <View className="flex-1 mx-5 mt-5">
          <FormField
            title="Title **required**"
            value={form.title}
            handleChangeText={handleChange("title")}
            error={error.title}
          />
          {error.title && <Text style={{ color: "red" }}>{error.title}</Text>}
          <FormField
            title="Made For"
            value={form.made_for}
            handleChangeText={handleChange("made_for")}
            error={error.made_for}
            multiline={true}
            numberOfLines={4}
          />
          {error.made_for && (
            <Text style={{ color: "red" }}>{error.made_for}</Text>
          )}
          <Text>Status</Text>
          <RadioButton.Group
            onValueChange={handleChange("status")}
            value={form.status} // fix type warning
          >
            <RadioButton.Item
              label={formatStatus("in_progress")}
              value="in_progress"
            />
            <RadioButton.Item
              label={formatStatus("finished")}
              value="finished"
            />
            <RadioButton.Item
              label={formatStatus("hibernating")}
              value="hibernating"
            />
          </RadioButton.Group>
          {error.status && <Text style={{ color: "red" }}>{error.status}</Text>}
          <Text>Craft Type **required**</Text>
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
          <View>
            <Text>Yarns Used **required**</Text>
            <Picker
              selectedValue={selectedYarn}
              onValueChange={handleYarnChange}
            >
              <Picker.Item label="Select a yarn" value={null} />
              {yarns?.map((yarn) => (
                <Picker.Item
                  key={yarn._id}
                  label={yarn.title}
                  value={yarn._id}
                />
              ))}
            </Picker>
            {error.yarns_used?.yarn && (
              <Text style={{ color: "red" }}>{error.yarns_used?.yarn}</Text>
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
                {error.yarns_used?.colorway_name && (
                  <Text style={{ color: "red" }}>
                    {error.yarns_used.colorway_name}
                  </Text>
                )}
              </View>
            )}
          </View>
          <Text>Pattern Used **required**</Text>
          <Picker
            selectedValue={form.pattern}
            onValueChange={handleChange("pattern")}
          >
            <Picker.Item label="Select a pattern" value={null} />
            {patterns?.map((pattern: PatternType) => (
              <Picker.Item
                key={pattern._id}
                label={pattern.title}
                value={pattern._id}
              />
            ))}
          </Picker>
          {error.pattern && (
            <Text style={{ color: "red" }}>{error.pattern}</Text>
          )}
          <Text>Needle/hook size</Text>
          <Picker
            selectedValue={form.needle_size}
            onValueChange={handleChange("needle_size")}
          >
            <Picker.Item label="Select a size" value={null} />
            {needleSizeOptions?.map((size: string) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
          {error.needle_size && (
            <Text style={{ color: "red" }}>{error.needle_size}</Text>
          )}
          <Button onPress={showStartDatepicker}>Show start date picker</Button>
          <Text>
            Start Date: {selectedStartDate?.toLocaleDateString("en-GB")}
          </Text>
          <Button onPress={showEndDatepicker}>Show end date picker</Button>
          <Text>End Date: {selectedEndDate?.toLocaleDateString("en-GB")}</Text>
          <Button onPress={() => handleSubmit(form)}>Submit</Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectForm;
