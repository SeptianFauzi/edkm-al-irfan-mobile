import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Title } from 'react-native-paper'

const Success = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/approved.png')} style={{ width: 200, height: 200, marginVertical: 50 }}></Image>
            <Title style={{ textAlign: 'center' }}>Data Berhasil Disimpan</Title>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
})

export default Success
