import { axiosAuthGet } from "@/api/axiosInstance";
import { PatternTypeID } from "@/types/index";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { useSession } from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/LoadingIndicator";
import Pattern from "@/components/PatternDetails";

const PatternDetails = () => {
  const { session } = useSession();
  const { _id } = useLocalSearchParams<{
    _id: string;
  }>();

  const [pattern, setPattern] = useState<PatternTypeID>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    // API call to get all patterns
    const fetchPattern = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuthGet(`/patterns/${_id}`, session);
        setPattern(response.data.data);
      } catch (e) {
        console.error(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPattern();
  }, [_id, session]);

  // Display while loading
  if (loading || !pattern) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    <ScrollView>
      <Pattern pattern={pattern} />
    </ScrollView>
  );
};

export default PatternDetails;
