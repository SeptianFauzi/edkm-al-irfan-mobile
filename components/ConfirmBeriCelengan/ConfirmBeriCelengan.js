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
import Success from "../Success/Success";
import Rejected from "../Rejected/Rejected";
import { RadioButton } from "react-native-paper";
import {
  GetDetailCelenganSent,
  GetStatusSelesaiMoneyBoxSent,
  GetStatusSisaMoneyBoxSent,
  UpdateCelenganSent,
} from "../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const ConfirmBeriCelengan = ({ route, navigation }) => {
  const { id_peserta, year_hijriah } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.celenganSent);

  const [update, setupdate] = useState(false);
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
    notes: yup.string().nullable(true),
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

  const handleChangeForm = async (name, value) => {
    setValue(name, value);
    setdataPostCelengan({
      ...dataPostCelengan,
      [name]: value,
    });
  };
  const onSubmit = async (data) => {
    dispatch(UpdateCelenganSent({ id_peserta: data.id, data: data }))
      .then(() => {
        setTimeout(() => {
          dispatch(GetStatusSelesaiMoneyBoxSent(year_hijriah));
          dispatch(GetStatusSisaMoneyBoxSent(year_hijriah));
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
        GetDetailCelenganSent({
          id_peserta: id_peserta,
          year_hijriah: year_hijriah,
        })
      );
    }
  }, [user]);
  useEffect(() => {
    if (state.celenganSent) {
      reset({
        id_user: user.user.id,
        id: state.celenganSent ? state.celenganSent[0].id : false,
        amount: state.celenganSent ? state.celenganSent[0].amount : 0,
        is_money_box_sent: state.celenganSent
          ? state.celenganSent[0].is_money_box_sent
          : false,
        notes: state.celenganSent ? state.celenganSent[0].notes : "",
        year_hijriah: year_hijriah,
      });
    }
  }, [state.celenganSent]);

  if (state.loading || !state.celenganSent) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.updateCelenganSent) {
    return <Success />;
  } else if (state.errorData) {
    return <Rejected />;
  } else if (state.celenganSent.length <= 0) {
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
  } else if (state.celenganSent.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ marginVertical: 20 }}>
            Beri Celengan Dana Sosial
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
                        : {state.celenganSent[0].id_peserta}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Nama{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.celenganSent[0].id_peserta_peserta.name}
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
                        : {state.celenganSent[0].year_hijriah} H
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
            <Text style={{ color: "#a8dbcc" }}>Status Diberi : </Text>
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
              name="is_money_box_sent"
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
            {errors.is_money_box_sent?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.is_money_box_sent?.message}
              </Caption>
            ) : (
              <View></View>
            )}
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ width: "100%", height: 100 }}
                label="Catatan"
                mode="outlined"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                multiline={true}
              />
            )}
            name="notes"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {errors.notes?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.notes?.message}
              </Caption>
            ) : (
              <View></View>
            )}
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

export default ConfirmBeriCelengan;
