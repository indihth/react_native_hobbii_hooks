import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const LoadingIndicator = () => {
  return (
    <View className='flex-1 justify-center items-center'>
    <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} />
    </View>
  )
}

export default LoadingIndicator