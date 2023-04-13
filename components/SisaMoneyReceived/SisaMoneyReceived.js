import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, Image } from 'react-native'

import axios from 'axios'
import { Avatar, Button, Caption, Card, Divider, FAB, List, Paragraph, Snackbar, Subheading, TextInput, Title } from 'react-native-paper'
import moment from 'moment-hijri'

import { URL_API } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import Success from '../Success/Success'
import Rejected from '../Rejected/Rejected'
import { RadioButton } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { GetStatusSisaMoneyBoxReceived } from '../../config/redux/services'
import { useDispatch, useSelector } from 'react-redux'
const SisaMoneyBoxReceived = ({ route, navigation, year_hijriah }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.celenganReceived)
    const [user, setuser] = useState({
        user: '',
        token: ''
    })
    const getUserItem = async (params) => {
        const awaitUser = await AsyncStorage.getItem('user')
        const userProfile = await JSON.parse(awaitUser)
        const token = AsyncStorage.getItem('token')
        setuser({
            ...user,
            user: userProfile,
            token: token
        })
    }
    useEffect(() => {
        if (!user.user) {
            getUserItem()
        } else {
            dispatch(GetStatusSisaMoneyBoxReceived(year_hijriah))
        }
    }, [user])
    const renderItem = ({ item, index }) => (
        <Card style={{ backgroundColor: 'red', marginTop: 10 }}>
            <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Title style={{ color: 'white' }}>ID : {item.id_peserta}</Title>
                        <Paragraph style={{ color: 'white' }} > Nama : {item.id_peserta_peserta.name}</Paragraph>
                    </View>
                </View>
            </Card.Content>
        </Card >
    );
    if (state.loadingSisaReceived || !state.celenganSisaReceived) {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1 }}>
                <ActivityIndicator size="large" animating={true} color="#28b5b5" />
                <Text style={{ marginVertical: 20 }}>Loading . . .</Text>

            </View>
        )
    } else if (state.error || state.errorData) {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1 }}>
                <Text>Terjadi kesalahan sistem</Text>
                <Text>Silahkan ulangi kembali</Text>
            </View>
        )
    }
    else if (state.celenganSisaReceived.length > 0) {
        return (
            <View style={styles.container}>
                {/* <View style={styles.sub_container}> */}
                <Title style={{ marginVertical: 5 }}>Daftar Sisa Peserta</Title>
                <Subheading>Tersisa : {state.celenganSisaReceived.length}</Subheading>
                <FAB
                    style={styles.fab}
                    small
                    icon="refresh"
                    onPress={() => dispatch(GetStatusSisaMoneyBoxReceived(year_hijriah))}
                />
                <FlatList data={state.celenganSisaReceived} style={{ width: '90%', maxHeight: '80%' }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id.toString()}>
                </FlatList >
                {/* </View> */}
            </View >
        )
    } else if (state.celenganSisaReceived.length <= 0) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <Title style={{ textAlign: 'center' }}>Data Tidak Ditemukan</Title>
                    <Title style={{ textAlign: 'center' }}>Semua Peserta Telah Dikumpulkan Celengannya</Title>
                    <Image source={require('../../assets/datanotfound.jpg')} style={{ width: 200, height: 200, marginVertical: 20 }}></Image>
                    <FAB
                        style={styles.fab}
                        small
                        icon="refresh"
                        onPress={() => dispatch(GetStatusSisaMoneyBoxReceived(year_hijriah))}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        backgroundColor: '#a8dbcc'
    },
    fab: {
        position: 'absolute',
        flexDirection: 'row',
        width: '80%',
        bottom: 10,
        backgroundColor: '#a8dbcc',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
});

export default SisaMoneyBoxReceived
