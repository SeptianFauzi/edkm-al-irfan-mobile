import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import {
  Button,
  Caption,
  Card,
  Divider,
  TextInput,
  Title,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Success from "../../Success/Success";
import Rejected from "../../Rejected/Rejected";
import { RadioButton } from "react-native-paper";
import {
  GetDetailZakatFitrahSent,
  GetStatusSelesaiZakatFitrahSent,
  GetStatusSisaZakatFitrahSent,
  UpdateZakatFitrahSent,
} from "../../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const ConfirmBeriZakatFitrah = ({ route, navigation }) => {
  const { id_peserta, year_hijriah } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.zakatFitrahSent);
  // const [update, setupdate] = useState(false)
  const [user, setuser] = useState({
    user: false,
    token: false,
  });
  const getUserItem = async () => {
    const awaitUser = await AsyncStorage.getItem("user");
    const userProfile = await JSON.parse(awaitUser);
    const token = await AsyncStorage.getItem("token");
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
      dispatchData();
    }
  }, [user]);
  const onSubmit = async (data) => {
    dispatch(UpdateZakatFitrahSent({ id_peserta: data.id, data: data }))
      .then(() => {
        setTimeout(() => {
          dispatch(GetStatusSelesaiZakatFitrahSent(year_hijriah));
          dispatch(GetStatusSisaZakatFitrahSent(year_hijriah));
          navigation.goBack();
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      });
  };
  useEffect(() => {
    if (state.zakatFitrahSent) {
      reset({
        id_user: user.user.id,
        id: state.zakatFitrahSent ? state.zakatFitrahSent[0].id : false,
        amount_sent: state.zakatFitrahSent
          ? state.zakatFitrahSent[0].amount_sent
          : 0,
        is_zakat_sent: state.zakatFitrahSent
          ? state.zakatFitrahSent[0].is_zakat_sent
          : false,
        notes: state.zakatFitrahSent ? state.zakatFitrahSent[0].notes : null,
        year_hijriah: year_hijriah,
      });
    }
  }, [state.zakatFitrahSent]);

  const dispatchData = () => {
    dispatch(
      GetDetailZakatFitrahSent({
        id_peserta: id_peserta,
        year_hijriah: year_hijriah,
      })
    );
  };
  const schema = yup.object().shape({
    catatan: yup.string(),
    is_zakat_sent: yup.string().required("Wajib diisi"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  if (state.loading || !state.zakatFitrahSent) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.updateZakatFitrahSent) {
    return <Success />;
  } else if (state.errorData) {
    return <Rejected />;
  } else if (state.zakatFitrahSent.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ marginVertical: 20 }}>Beri Zakat Fitrah</Title>
          <Card style={styles.container_menu}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Title
                  style={{ fontSize: 20, textAlign: "center", color: "white" }}
                >
                  {" "}
                  Identitas Peserta Penerima Zakat Fitrah
                </Title>
                <View style={{ paddingVertical: "5%" }}>
                  <Divider style={{ backgroundColor: "white" }} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}> ID </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.zakatFitrahSent[0].id_peserta}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Nama{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.zakatFitrahSent[0].id_peserta_peserta.name}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Tahun{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.zakatFitrahSent[0].year_hijriah} H
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Jatah{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.zakatFitrahSent[0].amount_sent} Liter
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#a8dbcc" }}>Status Diberikan : </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton value={"1"} />
                    <Text style={{ color: "#a8dbcc" }}>Sudah</Text>
                    <RadioButton value={"0"} />
                    <Text style={{ color: "#a8dbcc" }}>Belum</Text>
                  </View>
                </RadioButton.Group>
              )}
              name="is_zakat_sent"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {errors.is_zakat_sent?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.is_zakat_sent?.message}
              </Caption>
            ) : (
              <View></View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{ width: "100%", height: 100 }}
                  label="Catatan"
                  mode="outlined"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  multiline={true}
                />
              )}
              name="notes"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: "3%",
            }}
          >
            <Button
              onPress={handleSubmit(onSubmit)}
              style={{ width: "100%" }}
              loading={state.loadingData}
              disabled={state.loadingData}
              mode="contained"
            >
              <Text style={{ color: "white" }}>Simpan</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  } else if (state.zakatFitrahSent.length <= 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ textAlign: "center" }}>Data Tidak Ditemukan.</Title>
          <Title style={{ textAlign: "center" }}>
            Silakan menghubungi Admin E-DKM Al-Irfan
          </Title>
          <Image
            source={require("../../../assets/datanotfound.jpg")}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          ></Image>
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
    justifyContent: "center",
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
});

export default ConfirmBeriZakatFitrah;
