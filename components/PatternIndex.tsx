import { axiosAuthGet } from "@/api/axiosInstance";
import { useEffect, useState } from "react";

import { View } from "react-native";
import { PatternTypeID } from "@/types/index";
import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import LoadingIndicator from "@/components/LoadingIndicator";
import PatternsList from "@/components/PatternsList";
import { useSession } from "@/contexts/AuthContext";

type PatternsProps = {
  api_endpoint: string;
};

const Patterns = ({ api_endpoint }: PatternsProps) => {
  const { session } = useSession();
  const [patterns, setPatterns] = useState<PatternTypeID[]>([]); // type of an array of Patterns
  const [filteredPatterns, setFilteredPatterns] = useState<PatternTypeID[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true); // display loading text until api call is completed
        const response = await axiosAuthGet(api_endpoint, session);
        setPatterns(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  useEffect(() => {
    if (query) {
      // search function
      const results = patterns.filter(
        (pattern) => pattern.title.toLowerCase().includes(query.toLowerCase()) // everything in lowercase
      );
      setFilteredPatterns(results);
    } else {
      setFilteredPatterns(patterns);
    }
  }, [query, patterns]);

  if (loading || !patterns) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1 justify-center">
       <Stack.Screen
        options={{
          title: 'Search',
          headerTitle: (props) => (
            <View className="flex-1 flex-row items-center">
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.children}</Text>
            </View>
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (event) => setQuery(event.nativeEvent.text),
            tintColor: '#000',
            autoFocus: true,
            hideWhenScrolling: false,
            onCancelButtonPress: () => {},
          },
        }}
      />
      {/* <SearchInput query={query} setQuery={setQuery} /> */}

      <PatternsList patterns={filteredPatterns}/>
    </View>
  );
};

export default Patterns;
