import React from 'react'
import { View, Text } from 'react-native'

const Success = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/approved.png')} style={{ width: 200, height: 200, marginVertical: 50 }}></Image>
            <Title style={{ textAlign: 'center' }}>Data Gagal Di Simpan, Silahkan Coba Lagi</Title>
        </View>
    )
}

export default Success
