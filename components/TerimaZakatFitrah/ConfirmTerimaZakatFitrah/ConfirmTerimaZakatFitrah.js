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
  GetDetailZakatFitrahReceived,
  GetStatusSelesaiZakatFitrahReceived,
  GetStatusSisaZakatFitrahReceived,
  UpdateZakatFitrahReceived,
} from "../../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const ConfirmTerimaZakatFitrah = ({ route, navigation }) => {
  const { id_peserta, year_hijriah } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.zakatFitrahReceived);
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
    dispatch(UpdateZakatFitrahReceived({ id_peserta: data.id, data: data }))
      .then(() => {
        setTimeout(() => {
          dispatch(GetStatusSisaZakatFitrahReceived(year_hijriah));
          dispatch(GetStatusSelesaiZakatFitrahReceived(year_hijriah));
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
    reset({
      id_user: user.user.id,
      id:
        state.zakatFitrahReceived && state.zakatFitrahReceived.length > 0
          ? state.zakatFitrahReceived[0].id
          : false,
      is_zakat_received:
        state.zakatFitrahReceived && state.zakatFitrahReceived.length > 0
          ? state.zakatFitrahReceived[0].is_zakat_received
          : false,
      amount_received:
        state.zakatFitrahReceived && state.zakatFitrahReceived.length > 0
          ? state.zakatFitrahReceived[0].amount_received.toString()
          : null,
      kulak:
        state.zakatFitrahReceived && state.zakatFitrahReceived.length > 0
          ? (state.zakatFitrahReceived[0].amount_received / 3.25).toString()
          : null,
      notes:
        state.zakatFitrahReceived && state.zakatFitrahReceived.length > 0
          ? state.zakatFitrahReceived[0].notes
          : null,
      year_hijriah: year_hijriah,
    });
  }, [state.zakatFitrahReceived]);

  const dispatchData = () => {
    dispatch(
      GetDetailZakatFitrahReceived({
        id_peserta: id_peserta,
        year_hijriah: year_hijriah,
      })
    );
  };
  const schema = yup.object().shape({
    amount_received: yup
      .number()
      .typeError("Wajib angka")
      .required("Wajib diisi"),
    kulak: yup.number().typeError("Wajib angka").required("Wajib diisi"),
    catatan: yup.string(),
    is_zakat_received: yup.string().required("Wajib diisi"),
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
  const handleKulak = (value) => {
    setValue("kulak", value ? value : 0);
    setValue("amount_received", ((value ? value : 0) * 3.25).toString());
  };
  const handleLiter = (value) => {
    setValue("kulak", ((value ? value : 0) / 3.25).toString());
    setValue("amount_received", value ? value : 0);
  };

  if (state.loading || !state.zakatFitrahReceived) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.updateZakatFitrahReceived) {
    return <Success />;
  } else if (state.errorData) {
    return <Rejected />;
  } else if (state.zakatFitrahReceived.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ marginVertical: 20 }}>Kumpul Zakat Fitrah</Title>
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
                  Identitas Peserta Pengumpulan Zakat Fitrah
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
                        : {state.zakatFitrahReceived[0].id_peserta}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Nama{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.zakatFitrahReceived[0].id_peserta_peserta.name}
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
                        : {state.zakatFitrahReceived[0].year_hijriah} H
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
            <Text style={{ color: "#a8dbcc" }}>Status Dikumpulkan : </Text>
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
              name="is_zakat_received"
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
            {errors.is_zakat_received?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.is_zakat_received?.message}
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
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={{ width: "100%" }}
                  label="kulak"
                  keyboardType="numeric"
                  mode="outlined"
                  value={value}
                  onChangeText={handleKulak}
                  onBlur={onBlur}
                />
              )}
              name="kulak"
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
            {errors.amount_received?.message ? (
              <Caption
                style={{
                  color: "red",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {" "}
                {errors.amount_received?.message}
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
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={{ width: "100%" }}
                  label="Liter"
                  keyboardType="numeric"
                  mode="outlined"
                  value={value}
                  onChangeText={handleLiter}
                  onBlur={onBlur}
                />
              )}
              name="amount_received"
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
            {errors.amount_received?.message ? (
              <Caption
                style={{
                  color: "red",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {" "}
                {errors.amount_received?.message}
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
                  onChangeText={(value) => onChange(value)}
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
  } else if (state.zakatFitrahReceived.length <= 0) {
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

export default ConfirmTerimaZakatFitrah;
