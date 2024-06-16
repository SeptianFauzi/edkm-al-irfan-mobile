import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import {
  Card,
  FAB,
  Paragraph,
  Subheading,
  TextInput,
  Title,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList } from "react-native-gesture-handler";
import { GetStatusSelesaiMoneyBoxReceived } from "../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const SelesaiMoneyBoxReceived = ({ route, navigation, year_hijriah }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.celenganReceived);
  const [searchText, setSearchText] = useState("");
  const [user, setuser] = useState({
    user: "",
    token: "",
  });
  const getUserItem = async (params) => {
    const awaitUser = await AsyncStorage.getItem("user");
    const userProfile = await JSON.parse(awaitUser);
    const token = AsyncStorage.getItem("token");
    setuser({
      ...user,
      user: userProfile,
      token: token,
    });
  };
  useEffect(() => {
    if (!user.user) {
      getUserItem();
    } else {
      dispatch(GetStatusSelesaiMoneyBoxReceived(year_hijriah));
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchText("");
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const renderItem = ({ item, index }) => (
    <Card
      style={{ backgroundColor: "#a8dbcc", marginTop: 10 }}
      onPress={() =>
        navigation.navigate("ConfirmTerimaCelengan", {
          id_peserta: item.id_peserta,
          year_hijriah: year_hijriah,
        })
      }
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "column", justifyContent: "flex-start" }}
          >
            <Title style={{ color: "white" }}>ID : {item.id_peserta}</Title>
            <Paragraph style={{ color: "white" }}>
              {" "}
              Nama : {item.id_peserta_peserta.name}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
  if (state.loadingSelesaiReceived || !state.celenganSisaReceived) {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.error || state.errorData) {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <Text>Terjadi kesalahan sistem</Text>
        <Text>Silahkan ulangi kembali</Text>
      </View>
    );
  } else if (state.celenganSelesaiReceived) {
    return (
      <View style={styles.container}>
        <Title style={{ marginVertical: 10 }}>
          Daftar Peserta Yang Telah Dikumpulkan
        </Title>
        <Subheading>
          Terkirim : {state.celenganSelesaiReceived.length}
        </Subheading>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginEnd: 10,
          }}
        >
          <TextInput
            mode="outlined"
            style={{
              marginVertical: 10,
              width: "70%",
              borderRadius: 10,
              marginEnd: 10,
            }}
            value={searchText}
            placeholder="Cari Peserta"
            onChangeText={(value) => setSearchText(value)}
          />
          <FAB
            style={styles.fab}
            small
            icon="refresh"
            onPress={() =>
              dispatch(GetStatusSelesaiMoneyBoxReceived(year_hijriah))
            }
          />
        </View>
        <FlatList
          data={state.celenganSelesaiReceived.filter((value) => {
            return (
              value.id_peserta
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              value.id_peserta_peserta.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            );
          })}
          style={{ width: "90%" }}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        ></FlatList>
      </View>
    );
  } else if (!state.celenganSelesaiReceived) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ textAlign: "center" }}>Data Tidak Ditemukan.</Title>
          <Title style={{ textAlign: "center" }}>
            Semua Peserta Belum Diberikan Celengannya
          </Title>
          <Image
            source={require("../../assets/datanotfound.jpg")}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          ></Image>
          <FAB
            style={styles.fab}
            small
            icon="refresh"
            onPress={() =>
              dispatch(GetStatusSelesaiMoneyBoxReceived(year_hijriah))
            }
          />
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "white",
  },
  sub_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  container_menu: {
    paddingVertical: "4%",
    width: "100%",
    marginVertical: "1%",
    backgroundColor: "#a8dbcc",
  },
  fab: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#a8dbcc",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "white",
  },
});

export default SelesaiMoneyBoxReceived;
