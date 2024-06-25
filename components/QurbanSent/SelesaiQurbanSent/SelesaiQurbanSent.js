import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import {
  Button,
  Card,
  FAB,
  Menu,
  Paragraph,
  Subheading,
  TextInput,
  Title,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList } from "react-native-gesture-handler";
import { GetStatusSelesaiQurbanSent } from "../../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const SelesaiQurbanSent = ({ route, navigation, year_hijriah }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.qurbanSent);
  const [user, setuser] = useState({
    user: "",
    token: "",
  });

  const [location, setlocation] = useState("Semua");
  const [visible, setvisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openMenu = () => {
    setvisible(true);
  };
  const closeMenu = () => {
    setvisible(false);
  };
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
      dispatch(GetStatusSelesaiQurbanSent({ year_hijriah, location }));
    }
  }, [user, location]);

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
      onPress={() => {
        navigation.navigate("ConfirmBeriQurban", {
          id_peserta: item.id_peserta,
          year_hijriah: year_hijriah,
        });
      }}
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
  if (state.loadingSelesaiSent || !state.qurbanSelesaiSent) {
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
  } else if (state.qurbanSelesaiSent.length > 0) {
    return (
      <View style={styles.container}>
        <Title style={{ marginVertical: 5 }}>
          Daftar Peserta Yang Telah Dibagkan
        </Title>
        <Subheading>Terkirim : {state.qurbanSelesaiSent.length}</Subheading>
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
              dispatch(GetStatusSelesaiQurbanSent({ year_hijriah, location }))
            }
          />
        </View>
        <FlatList
          data={state.qurbanSelesaiSent.filter((value) => {
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
  } else if (state.qurbanSelesaiSent.length <= 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ textAlign: "center" }}>Data Tidak Ditemukan.</Title>
          <Title style={{ textAlign: "center" }}>
            Semua Peserta Belum Diberikan Qurbannya
          </Title>
          <Image
            source={require("../../../assets/datanotfound.jpg")}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          ></Image>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu
              style={{ marginHorizontal: "2%" }}
              mode="outlined"
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button icon="filter" mode="outlined" onPress={openMenu}>
                  {location}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setvisible(false);
                  setlocation("Batas");
                }}
                title="Batas"
              />
              <Menu.Item
                onPress={() => {
                  setvisible(false);
                  setlocation("Tonggoh");
                }}
                title="Tonggoh"
              />
              <Menu.Item
                onPress={() => {
                  setvisible(false);
                  setlocation("Semua");
                }}
                title="Semua"
              />
            </Menu>
            <Button
              style={{ marginHorizontal: "2%" }}
              icon="refresh"
              onPress={() =>
                dispatch(
                  GetStatusSelesaiQurbanSent({
                    year_hijriah: year_hijriah,
                    location: location,
                  })
                )
              }
              loading={state.loadingData}
              disabled={state.loadingData}
              mode="outlined"
            >
              Reload
            </Button>
          </View>
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

export default SelesaiQurbanSent;
