import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import axios from "axios";
import {
  Avatar,
  Button,
  Caption,
  Card,
  Divider,
  Snackbar,
  TextInput,
  Title,
} from "react-native-paper";
import moment from "moment-hijri";

import { URL_API } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Success from "../../Success/Success";
import Rejected from "../../Rejected/Rejected";
import { RadioButton } from "react-native-paper";
import {
  GetDetailQurbanSent,
  UpdateQurbanSent,
} from "../../../config/redux/services";
import { useDispatch, useSelector } from "react-redux";
const ConfirmBeriQurban = ({ route, navigation }) => {
  const { id_peserta, year_hijriah } = route.params;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.qurbanSent);

  const [update, setupdate] = useState(false);
  const [user, setuser] = useState({
    user: false,
    token: false,
  });
  const [dataPostQurban, setdataPostQurban] = useState(false);
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
  });

  const handleChangeForm = async (name, value) => {
    setValue(name, value);
    setdataPostQurban({
      ...dataPostQurban,
      [name]: value,
    });
  };
  const onSubmit = async (data) => {
    dispatch(
      UpdateQurbanSent({ id_peserta: dataPostQurban.id, data: dataPostQurban })
    )
      .then(() => {
        setTimeout(() => {
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
      if (update && state.qurbanSent.length > 0) {
        setdataPostQurban({
          ...dataPostQurban,
          id_user: user.user.id,
          id: state.qurbanSent[0].id,
          amount_sent: state.qurbanSent[0].amount_sent,
          amount_type: state.qurbanSent[0].amount_type,
          is_qurban_sent: state.qurbanSent[0].is_qurban_sent,
          notes: state.qurbanSent[0].notes ? state.qurbanSent[0].notes : "",
          year_hijriah: year_hijriah,
        });
      } else {
        dispatch(
          GetDetailQurbanSent({
            id_peserta: id_peserta,
            year_hijriah: year_hijriah,
          })
        ).then((response) => {
          setupdate(true);
        });
      }
    }
  }, [user, update]);
  if (state.loading || !state.qurbanSent || !dataPostQurban) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color="#28b5b5" />
        <Text style={{ marginVertical: 20 }}>Loading . . .</Text>
      </View>
    );
  } else if (state.updateQurbanSent) {
    return <Success />;
  } else if (state.errorData) {
    return <Rejected />;
  } else if (state.qurbanSent.length <= 0) {
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
  } else if (state.qurbanSent.length > 0 && dataPostQurban) {
    return (
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <Title style={{ marginVertical: 20 }}>Beri Qurban</Title>
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
                  Identitas Peserta Penerima Daging Qurban
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
                        : {state.qurbanSent[0].id_peserta}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Nama{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.qurbanSent[0].id_peserta_peserta.name}
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
                        : {state.qurbanSent[0].year_hijriah} H
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        {" "}
                        Jatah{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "white" }}>
                        : {state.qurbanSent[0].amount_sent}{" "}
                        {state.qurbanSent[0].amount_type}
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
                <RadioButton.Group
                  onValueChange={(value) =>
                    handleChangeForm("is_qurban_sent", value)
                  }
                  value={dataPostQurban.is_qurban_sent.toString()}
                  defaultValue={state.qurbanSent[0].is_qurban_sent.toString()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton value="true" />
                    <Text style={{ color: "#a8dbcc" }}>Sudah</Text>
                    <RadioButton value="false" />
                    <Text style={{ color: "#a8dbcc" }}>Belum</Text>
                  </View>
                </RadioButton.Group>
              )}
              name="is_qurban_sent"
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
            {errors.is_qurban_sent?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.is_qurban_sent?.message}
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
                onChangeText={(value) => handleChangeForm("notes", value)}
                mode="outlined"
                onBlur={onBlur}
                value={dataPostQurban.notes.toString()}
                onChange={onChange}
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
            {errors.amount_sent?.message ? (
              <Caption style={{ color: "red" }}>
                {" "}
                {errors.amount_sent?.message}
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

export default ConfirmBeriQurban;
