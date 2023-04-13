import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Title } from 'react-native-paper'
const Rejected = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/rejected.png')} style={{ width: 200, height: 200, marginVertical: 50 }}></Image>
            <Title style={{ textAlign: 'center' }}>Data Gagal Disimpan, Silahkan Coba lagi</Title>
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
export default Rejected
