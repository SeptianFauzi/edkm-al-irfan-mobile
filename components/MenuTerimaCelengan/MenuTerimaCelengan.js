import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SampleScreen from "../SampleScreen/SampleScreen";
import BeriCelengan from "../BeriCelengan/BeriCelengan";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SisaMoneyBoxSent from "../SisaMoneyBoxSent/SisaMoneyBoxSent";
import SelesaiMoneyBoxSent from "../SelesaiMoneyBoxSent/SelesaiMoneyBoxSent";
import ScanBeriCelengan from "../ScanBeriCelengan/ScanBeriCelengan";
import ScanTerimaCelengan from "../ScanTerimaCelengan/ScanTerimaCelengan";
import SisaMoneyReceived from "../SisaMoneyReceived/SisaMoneyReceived";
import SelesaiMoneyReceived from "../SelesaiMoneyReceived/SelesaiMoneyReceived";
const Tab = createMaterialTopTabNavigator();

const MenuTerimaCelengan = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { year_hijriah } = route.params;
  return (
    <Tab.Navigator initialRouteName="Peserta">
      <Tab.Screen
        name="Sisa"
        children={() => (
          <SisaMoneyReceived
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Scan Peserta"
        children={() => (
          <ScanTerimaCelengan
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Selesai"
        children={() => (
          <SelesaiMoneyReceived
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default MenuTerimaCelengan;
