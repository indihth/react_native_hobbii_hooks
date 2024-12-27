import { axiosAuthGet } from "@/api/axiosInstance";
import { PatternTypeID } from "@/types/index";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView
} from "react-native";

import { useSession } from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/LoadingIndicator";
import Pattern from "@/components/Pattern";

const PatternDetails = () => {
  const { session } = useSession();
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const [pattern, setPattern] = useState<PatternTypeID>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setLoading(true); // display loading text until api call is completed

    // API call to get all patterns
    axiosAuthGet(`/patterns/${_id}`, session)
      .then((response) => {
        setPattern(response.data.data);
        setLoading(false);
        // console.log(pattern);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [_id, session]);

  // Display while loading
  if (loading || !pattern) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    <ScrollView>
      <SafeAreaView>
     <Pattern pattern={pattern}/>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PatternDetails;
