import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

const SampleScreen = () => {
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Text>This is top text.</Text>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    )
}

export default SampleScreen
