import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScanTerimaZakatFitrah from "../ScanTerimaZakatFitrah/ScanTerimaZakatFitrah";
import SisaZakatFitrahReceived from "../SisaZakatFitrahReceived/SisaZakatFitrahReceived";
import SelesaiZakatFitrahReceived from "../SelesaiZakatFitrahReceived/SelesaiZakatFitrahReceived";
const Tab = createMaterialTopTabNavigator();

const MenuTerimaZakatFitrah = ({ route, navigation }) => {
  const { year_hijriah } = route.params;
  return (
    <Tab.Navigator initialRouteName="Peserta">
      <Tab.Screen
        name="Sisa"
        children={() => (
          <SisaZakatFitrahReceived
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Scan Peserta"
        children={() => (
          <ScanTerimaZakatFitrah
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Selesai"
        children={() => (
          <SelesaiZakatFitrahReceived
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default MenuTerimaZakatFitrah;
