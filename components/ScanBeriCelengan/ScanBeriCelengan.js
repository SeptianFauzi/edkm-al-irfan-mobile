import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import axios from 'axios'
import { Button, Caption, Card, Divider, Snackbar, TextInput, Title } from 'react-native-paper'
import moment from 'moment-hijri'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
const ScanBeriCelengan = ({ route, navigation, year_hijriah }) => {
    const [loading, setloading] = useState(false)
    const [Peserta, setPeserta] = useState(false)
    const schema = yup.object().shape({
        year_hijriah: yup.number().required('Wajid Di isi'),
    });
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange'
    });

    const handleChangeForm = (name, value) => {
        setValue(name, value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: '5%' }}>
                    <Title style={{ textAlign: 'center' }}>Sentuh Tombol Dibawah Untuk Melakukan Scan Code</Title>
                    <Button onPress={() => navigation.navigate('QrCodeKumpulZakatFitrah', { type: 'BeriCelengan', year_hijriah: year_hijriah })} style={{ width: '100%', color: '#fff' }} loading={loading} disabled={loading} mode="contained"><Text style={{ color: 'white' }}>Scan</Text></Button>
                </View>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white'

    },
    sub_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'

    },
    container_menu: {
        paddingVertical: '4%',
        width: '100%',
        marginVertical: '1%',
        backgroundColor: '#28b5b5'
    }

});

export default ScanBeriCelengan
