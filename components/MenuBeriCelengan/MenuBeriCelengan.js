import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SampleScreen from '../SampleScreen/SampleScreen';
import BeriCelengan from '../BeriCelengan/BeriCelengan';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SisaMoneyBoxSent from '../SisaMoneyBoxSent/SisaMoneyBoxSent';
import SelesaiMoneyBoxSent from '../SelesaiMoneyBoxSent/SelesaiMoneyBoxSent';
import ScanBeriCelengan from '../ScanBeriCelengan/ScanBeriCelengan';
const Tab = createMaterialTopTabNavigator();

const MenuBeriCelengan = ({ route, navigation }) => {
    const insets = useSafeAreaInsets()
    const { year_hijriah } = route.params
    return (
        <Tab.Navigator initialRouteName="Peserta">
            <Tab.Screen name="Sisa" children={() => <SisaMoneyBoxSent year_hijriah={year_hijriah} />} />
            <Tab.Screen name="Scan Peserta" children={() => <ScanBeriCelengan year_hijriah={year_hijriah} navigation={navigation} />} />
            <Tab.Screen name="Selesai" children={() => <SelesaiMoneyBoxSent year_hijriah={year_hijriah} />} />
        </Tab.Navigator>
    )
}

export default MenuBeriCelengan
