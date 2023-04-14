import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ActivityIndicator, Button, Caption, Snackbar, Subheading, TextInput } from 'react-native-paper'
import { URL_API } from '@env'
import { StackActions } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Controller, FormProvider, useForm } from 'react-hook-form'
const LoginScreen = ({ navigation }) => {
    const [loading, setloading] = useState(false)
    const [visible, setvisible] = useState(false)
    const [disabled, setdisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [dataPostLogin, setdataPostLogin] = useState({
        emailusername: '',
        password: ''
    })
    const onSubmit = async (data) => {
        await setloading(true)
        await setdisabled(true)
        axios.post('/api/login', data, {
        })
            .then(function (response) {
                if (response.data.data != null) {
                    AsyncStorage.setItem('user', JSON.stringify(response.data.data))
                    AsyncStorage.setItem('token', response.data.data.api_token)
                    setloading(false)
                    setdisabled(false)
                    const navigateLogin = StackActions.replace('Home')
                    navigation.dispatch(navigateLogin)
                } else {
                    setvisible(true)
                    setdisabled(false)
                    setloading(false)
                    setErrorMessage('Email/Username Password Salah')
                }

            })
            .catch(function (error) {
                setErrorMessage("Error Network")
                setloading(false)
                setdisabled(false)
                setvisible(true)
            })
    }

    useEffect(() => {
        const checkUser = async (params) => {
            const getItem = await AsyncStorage.getItem('user')
            if (getItem) {
                navigation.dispatch(StackActions.replace('Home'))
            }
        }
        setdataPostLogin({
            emailusername: 'sample',
            password: 'sample'
        })
        checkUser()
    }, [])

    const schema = yup.object().shape({
        emailusername: yup.string().required(),
        password: yup.string().required('Password Wajib Di Isi')
    });
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange'
    });
    const onDismissSnackBar = (params) => {
        setvisible(false)
    }

    if (AsyncStorage.getItem('user')) {
        return (
            <View style={styles.container}>
                <View style={styles.sub_container}>
                    <Image source={require('../../assets/logoDkmAlIrfan.png')} style={{ width: 150, height: 150 }}></Image>
                    <View style={{ flexDirection: 'column', marginVertical: 10, justifyContent: 'flex-start', width: '100%' }}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput style={{ width: '100%' }}
                                    label="Email/Username"
                                    onChangeText={value => onChange(value)}
                                    mode="outlined"
                                    onBlur={onBlur}
                                    value={value}
                                    disabled={disabled}
                                />
                            )}
                            name="emailusername" />
                        {errors.emailusername?.message ? <Caption>{errors.emailusername?.message}</Caption> : <View></View>}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput secureTextEntry={true} style={{ width: '100%' }}
                                    label="Password"
                                    onChangeText={value => onChange(value)}
                                    mode="outlined"
                                    onBlur={onBlur}
                                    value={value}
                                    disabled={disabled}
                                />
                            )}
                            name="password"
                        />
                        {errors.password?.message ? <Caption>{errors.password?.message}</Caption> : <View></View>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button onPress={handleSubmit(onSubmit)} style={{ width: '100%', color: 'white' }} mode="contained" loading={loading}><Text style={{ color: '#f6f6f6' }}>Masuk</Text></Button>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
                        <Subheading>E - DKM Al-Irfan</Subheading>
                        <Snackbar style={{ position: 'absolute' }}
                            visible={visible}
                            onDismiss={onDismissSnackBar}
                            duration={2000}>
                            {errorMessage}
                        </Snackbar>
                    </View>
                </View>
            </View >
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" animating={true} color="primary" />
            </View>
        )
    }

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
export default LoginScreen
