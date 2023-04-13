import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, Image } from 'react-native'

import axios from 'axios'
import { Avatar, Button, Caption, Card, Divider, FAB, List, Menu, Paragraph, Snackbar, Subheading, TextInput, Title } from 'react-native-paper'
import moment from 'moment-hijri'

import { URL_API } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import Success from '../../Success/Success'
import Rejected from '../../Rejected/Rejected'
import { RadioButton } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { GetStatusSisaQurbanSent } from '../../../config/redux/services'
import { useDispatch, useSelector } from 'react-redux'
const SisaQurbanSent = ({ route, navigation, year_hijriah }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.qurbanSent)

    const [user, setuser] = useState({
        user: '',
        token: ''
    })
    const [location, setlocation] = useState('Semua')
    const [visible, setvisible] = useState(false)

    const openMenu = () => {
        setvisible(true)
    }
    const closeMenu = () => {
        setvisible(false)
    }
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
            dispatch(GetStatusSisaQurbanSent({ year_hijriah: year_hijriah, location: location }))
        }
    }, [user, location])
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
    if (state.loadingSisaSent || !state.qurbanSelesaiSent) {
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
    else if (state.qurbanSisaSent.length > 0) {
        return (
            <View style={styles.container}>
                {/* <View style={styles.sub_container}> */}
                <Title style={{ marginVertical: 5 }}>Daftar Sisa Peserta</Title>
                <Subheading>Tersisa : {state.qurbanSisaSent.length}</Subheading>

                <FlatList data={state.qurbanSisaSent} style={{ width: '90%', maxHeight: '80%', marginBottom: '2%' }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id.toString()}>
                </FlatList >
                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                    <Menu
                        style={{ marginHorizontal: '2%' }}
                        mode="outlined"
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button icon="filter" mode="outlined" onPress={openMenu}>{location}</Button>}>
                        <Menu.Item onPress={() => {
                            setvisible(false)
                            setlocation('Batas')
                        }} title="Batas" />
                        <Menu.Item onPress={() => {
                            setvisible(false)
                            setlocation('Tonggoh')
                        }} title="Tonggoh" />
                        <Menu.Item onPress={() => {
                            setvisible(false)
                            setlocation('Semua')
                        }} title="Semua" />
                    </Menu>
                    <Button style={{ marginHorizontal: '2%' }} icon="refresh" onPress={() => dispatch(GetStatusSisaQurbanSent({ year_hijriah: year_hijriah, location: location }))} loading={state.loadingData} disabled={state.loadingData} mode="outlined">Reload</Button>
                </View>

                {/* <FAB
                    style={styles.fab}
                    small
                    icon="refresh"
                    onPress={() => // console.log'sample')}
                /> */}
                {/* </View> */}
            </View >
        )
    } else if (state.qurbanSisaSent.length <= 0) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <Title style={{ textAlign: 'center' }}>Data Tidak Ditemukan</Title>
                    <Title style={{ textAlign: 'center' }}>Semua Peserta Telah Diberikan Qurbannya</Title>
                    <Image source={require('../../../assets/datanotfound.jpg')} style={{ width: 200, height: 200, marginVertical: 20 }}></Image>
                    <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                        <Menu
                            style={{ marginHorizontal: '2%' }}
                            mode="outlined"
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button icon="filter" mode="outlined" onPress={openMenu}>{location}</Button>}>
                            <Menu.Item onPress={() => {
                                setvisible(false)
                                setlocation('Batas')
                            }} title="Batas" />
                            <Menu.Item onPress={() => {
                                setvisible(false)
                                setlocation('Tonggoh')
                            }} title="Tonggoh" />
                            <Menu.Item onPress={() => {
                                setvisible(false)
                                setlocation('Semua')
                            }} title="Semua" />
                        </Menu>
                        <Button style={{ marginHorizontal: '2%' }} icon="refresh" onPress={() => dispatch(GetStatusSisaQurbanSent({ year_hijriah: year_hijriah, location: location }))} loading={state.loadingData} disabled={state.loadingData} mode="outlined">Reload</Button>
                    </View>
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

export default SisaQurbanSent
