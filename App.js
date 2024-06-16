import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import QrCodeKumpulZakatFitrah from "./components/QrCodeKumpulZakatFitrah/QrCodeKumpulZakatFitrah";
import SampleScreen from "./components/SampleScreen/SampleScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import TerimaCelengan from "./components/TerimaCelengan/TerimaCelengan";
import ConfirmTerimaCelengan from "./components/ConfirmTerimaCelengan/ConfirmTerimaCelengan";
import BeriCelengan from "./components/BeriCelengan/BeriCelengan";
import ConfirmBeriCelengan from "./components/ConfirmBeriCelengan/ConfirmBeriCelengan";
import MenuBeriCelengan from "./components/MenuBeriCelengan/MenuBeriCelengan";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MenuTerimaCelengan from "./components/MenuTerimaCelengan/MenuTerimaCelengan";
import { Provider as StoreProvider } from "react-redux";
import store from "./config/redux/store";
import BeriQurban from "./components/QurbanSent/BeriQurban/BeriQurban";
import MenuBeriQurban from "./components/QurbanSent/MenuBeriQurban/MenuBeriQurban";
import ConfirmBeriQurban from "./components/QurbanSent/ConfirmBeriQurban/ConfirmBeriQurban";
import TerimaZakatFitrah from "./components/TerimaZakatFitrah/TerimaZakatFitrah/TerimaZakatFitrah";
import MenuTerimaZakatFitrah from "./components/TerimaZakatFitrah/MenuTerimaZakatFitrah/MenuTerimaZakatFitrah";
import ConfirmTerimaZakatFitrah from "./components/TerimaZakatFitrah/ConfirmTerimaZakatFitrah/ConfirmTerimaZakatFitrah";
import MenuBeriZakatFitrah from "./components/BeriZakatFitrah/MenuBeriZakatFitrah/MenuBeriZakatFitrah";
import ConfirmBeriZakatFitrah from "./components/BeriZakatFitrah/ConfirmBeriZakatFitrah/ConfirmBeriZakatFitrah";
import BeriZakatFitrah from "./components/BeriZakatFitrah/BeriZakatFitrah/BeriZakatFitrah";
const Stack = createStackNavigator();
export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
      ...DefaultTheme.colors,
      primary: "#a8dbcc",
      accent: "#c0d6de",
      placeholder: "#a8dbcc",
      text: "#56bdbe",
      background: "#f6f6f6",
    },
  };
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Sample" component={SampleScreen} />
              <Stack.Screen
                name="QrCodeKumpulZakatFitrah"
                component={QrCodeKumpulZakatFitrah}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TerimaZakatFitrah"
                component={TerimaZakatFitrah}
              />
              <Stack.Screen
                name="ConfirmTerimaZakatFitrah"
                component={ConfirmTerimaZakatFitrah}
              />
              <Stack.Screen
                name="ConfirmBeriZakatFitrah"
                component={ConfirmBeriZakatFitrah}
              />
              <Stack.Screen
                name="BeriZakatFitrah"
                component={BeriZakatFitrah}
              />
              <Stack.Screen name="TerimaCelengan" component={TerimaCelengan} />
              <Stack.Screen
                name="ConfirmTerimaCelengan"
                component={ConfirmTerimaCelengan}
              />
              <Stack.Screen name="BeriCelengan" component={BeriCelengan} />
              <Stack.Screen name="BeriQurban" component={BeriQurban} />
              <Stack.Screen
                name="ConfirmBeriCelengan"
                component={ConfirmBeriCelengan}
              />
              <Stack.Screen
                name="ConfirmBeriQurban"
                component={ConfirmBeriQurban}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MenuBeriCelengan"
                component={MenuBeriCelengan}
              />
              <Stack.Screen name="MenuBeriQurban" component={MenuBeriQurban} />
              <Stack.Screen
                name="MenuTerimaCelengan"
                component={MenuTerimaCelengan}
              />
              <Stack.Screen
                name="MenuTerimaZakatFitrah"
                component={MenuTerimaZakatFitrah}
              />
              <Stack.Screen
                name="MenuBeriZakatFitrah"
                component={MenuBeriZakatFitrah}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
