import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScanBeriZakatFitrah from "../ScanBeriZakatFitrah/ScanBeriZakatFitrah";
import SisaZakatFitrahSent from "../SisaZakatFitrahSent/SisaZakatFitrahSent";
import SelesaiZakatFitrahSent from "../SelesaiZakatFitrahSent/SelesaiZakatFitrahSent";
const Tab = createMaterialTopTabNavigator();

const MenuBeriZakatFitrah = ({ route, navigation }) => {
  const { year_hijriah } = route.params;
  return (
    <Tab.Navigator initialRouteName="Peserta">
      <Tab.Screen
        name="Sisa"
        children={() => (
          <SisaZakatFitrahSent
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Scan Peserta"
        children={() => (
          <ScanBeriZakatFitrah
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Selesai"
        children={() => (
          <SelesaiZakatFitrahSent
            year_hijriah={year_hijriah}
            navigation={navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default MenuBeriZakatFitrah;
