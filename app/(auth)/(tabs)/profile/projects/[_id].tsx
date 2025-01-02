import { axiosAuthGet } from "@/api/axiosInstance";
import { ProjectTypeID } from "@/types/index";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Text } from "react-native";

import { useSession } from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/LoadingIndicator";
import Project from "@/components/Project";

const ProjectDetails = () => {
  const { session } = useSession();
  const router = useRouter();
  const { _id, source } = useLocalSearchParams<{
    _id: string;
    source: string;
  }>();

  const [project, setProject] = useState<ProjectTypeID>(); // type of an array of Patterns
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const [index, setIndex] = useState(0);

  const fetchProject = async () => {
    try {
      const response = await axiosAuthGet(`/projects/${_id}`, session);
      // const response = await axiosAuthGet(`/project/${_id}`, session);
      setProject(response.data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setLoading(true); // display loading text until api call is completed

  //   fetchProject();
  // }, [_id, session]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true); // display loading text until api call is completed

      fetchProject();
    }, [_id, session])
  );

  // Display while loading
  if (loading || !project) {
    return <LoadingIndicator />; // Replace with a spinner if needed
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <Project project={project} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProjectDetails;
