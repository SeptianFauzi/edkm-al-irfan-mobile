import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SisaQurbanSent from '../SisaQurbanSent/SisaQurbanSent';
import SelesaiQurbanSent from '../SelesaiQurbanSent/SelesaiQurbanSent';
import ScanBeriQurban from '../ScanBeriQurban/ScanBeriQurban';
const Tab = createMaterialTopTabNavigator();

const MenuBeriQurban = ({ route, navigation }) => {
    const insets = useSafeAreaInsets()
    const { year_hijriah } = route.params
    return (
        <Tab.Navigator initialRouteName="Peserta">
            <Tab.Screen name="Sisa" children={() => <SisaQurbanSent year_hijriah={year_hijriah} />} />
            <Tab.Screen name="Scan Peserta" children={() => <ScanBeriQurban year_hijriah={year_hijriah} navigation={navigation} />} />
            <Tab.Screen name="Selesai" children={() => <SelesaiQurbanSent year_hijriah={year_hijriah} />} />
        </Tab.Navigator>
    )
}

export default MenuBeriQurban
