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
import Success from "../Success/Success";
import Rejected from "../Rejected/Rejected";
import { RadioButton } from "react-native-paper";
import {
  GetDetailCelenganReceived,
  GetStatusSelesaiMoneyBoxReceived,
  GetStatusSisaMoneyBoxReceived,
  UpdateCelenganReceived,
} from "../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const ConfirmTerimaCelengan = ({ route, navigation }) => {
  const { id_peserta, year_hijriah } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.celenganReceived);
  const [user, setuser] = useState({
    user: false,
    token: false,
  });
  const getUserItem = async (params) => {
    const awaitUser = await AsyncStorage.getItem("user");
    const userProfile = await JSON.parse(awaitUser);
    const token = await AsyncStorage.getItem("token");
    setuser({
      ...user,
      user: userProfile,
      token: token,
    });
  };
  const schema = yup.object().shape({
    amount: yup.number("Wajib angka").required("Wajib diisi"),
    notes: yup.string().nullable(true),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  const onSubmit = async (data) => {
    dispatch(
      UpdateCelenganReceived({
        id_peserta: data.id,
        data: {
          ...data,
          id_peserta: state.celenganReceived[0].id_peserta,
        },
      })
    )
      .then(() => {
        setTimeout(() => {
          dispatch(GetStatusSelesaiMoneyBoxReceived(year_hijriah));
          dispatch(GetStatusSisaMoneyBoxReceived(year_hijriah));
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
    if (!user.user) {
      getUserItem();
    } else {
      dispatch(
        GetDetailCelenganReceived({
          id_peserta: id_peserta,
          year_hijriah: year_hijriah,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (state.celenganReceived) {
      reset({
        id_user: user.user.id,
        id:
          state.celenganReceived && state.celenganReceived.length > 0
            ? state.celenganReceived[0].id
            : false,
        amount:
          state.celenganReceived && state.celenganReceived.length > 0
            ? state.celenganReceived[0].amount.toString()
            : 0,
        is_money_received:
          state.celenganReceived && state.celenganReceived.length > 0
            ? state.celenganReceived[0].is_money_received
            : false,
        notes:
          state.celenganReceived && state.celenganReceived.length > 0
            ? state.celenganReceived[0].notes
            : "",
        year_hijriah: year_hijriah,
      });
    }
  }, [state.celenganReceived]);

  if (state.loading || !state.celenganReceived) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.updateCelenganReceived) {
    return <Success />;
  } else if (state.errorData) {
    return <Rejected />;
  } else if (state.celenganReceived.length <= 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ textAlign: "center" }}>Data Tidak Ditemukan.</Title>
          <Title style={{ textAlign: "center" }}>
            Silakan menghubungi Admin E-DKM Al-Irfan
          </Title>
          <Image
            source={require("../../assets/datanotfound.jpg")}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          ></Image>
        </View>
      </View>
    );
  } else if (state.celenganReceived.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ marginVertical: 20 }}>
            Kumpulkan Celengan Dana Sosial
          </Title>
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
                  Identitas Peserta Celengan Dana Sosial
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
                        : {state.celenganReceived[0].id_peserta}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Nama{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.celenganReceived[0].id_peserta_peserta.name}
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
                        : {state.celenganReceived[0].year_hijriah} H
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
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#a8dbcc" }}>Status Dikumpulkan : </Text>
            <Controller
              control={control}
              defaultValue={state.celenganReceived[0].is_money_received}
              render={({ field: { onChange, value } }) => (
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
              name="is_money_received"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#a8dbcc", width: "50%" }}>
              Apakah Celengan Lansung Dikembalikan Untuk Tahun Depan :
            </Text>
            <Controller
              control={control}
              defaultValue={"0"}
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton value={"1"} />
                    <Text style={{ color: "#a8dbcc" }}>Ya</Text>
                    <RadioButton value={"0"} />
                    <Text style={{ color: "#a8dbcc" }}>Tidak</Text>
                  </View>
                </RadioButton.Group>
              )}
              name="isForNextYear"
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
            {errors.is_money_received?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.is_money_received?.message}
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
                  label="Jumlah Uang (Rp)"
                  keyboardType="numeric"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                />
              )}
              name="amount"
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
            {errors.amount?.message ? (
              <Caption
                style={{
                  color: "red",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {" "}
                {errors.amount?.message}
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
                  onChangeText={onChange}
                  mode="outlined"
                  onBlur={onBlur}
                  value={value}
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

export default ConfirmTerimaCelengan;
