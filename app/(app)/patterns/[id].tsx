import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const PatternDetails = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Pattern details page</Text>
    </View>
  )
}

export default PatternDetails