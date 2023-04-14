/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Avatar, Card, Title, Paragraph } from 'react-native-paper';
const HomeScreen = ({ navigation }) => {
    const handleLogout = async params => {
        const removeUser = await AsyncStorage.removeItem('user');
        const removeToken = await AsyncStorage.removeItem('token');
        const navigateLogin = await StackActions.replace('LoginScreen');
        navigation.dispatch(navigateLogin);
    };
    const getUserToken = async params => {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
    };
    useEffect(() => {
        getUserToken();
    }, []);
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginVertical: '10%',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Text style={{ fontSize: 24, color: 'white' }}>MAIN MENU</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('TerimaZakatFitrah')}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Kumpul Zakat Fitrah
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('BeriZakatFitrah')}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Beri Zakat Fitrah
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('TerimaCelengan')}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Kumpul Celengan Dana Sosial
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('BeriCelengan')}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Beri Celengan Dana Sosial
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('BeriQurban')}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Beri Qurban
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogout}
                style={{ width: '100%', paddingHorizontal: '2%' }}>
                <Card style={styles.container_menu}>
                    <Card.Content>
                        <Text style={{ fontSize: 20, color: '#28b5b5', textAlign: 'center' }}>
                            Logout
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#28b5b5',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    container_menu: {
        paddingVertical: '2%',
        width: '100%',
        marginVertical: '1%',
        backgroundColor: '#fff',
    },
});
export default HomeScreen;
