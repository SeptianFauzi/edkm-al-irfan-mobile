import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button, Caption, TextInput, Title } from "react-native-paper";
import moment from "moment-hijri";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const BeriZakatFitrah = ({ navigation }) => {
  const [yearHijriah, setyearHijriah] = useState(moment().iYear());

  const onSubmit = (data) => {
    navigation.navigate("MenuBeriZakatFitrah", {
      year_hijriah: data.year_hijriah,
    });
  };

  const schema = yup.object().shape({
    year_hijriah: yup.number().typeError("Wajib angka").required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const handleChangeForm = (name, value) => {
    setValue(name, value);
  };
  useEffect(() => {
    setValue("year_hijriah", yearHijriah.toString());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <Title>Masukan Tahun Hijriah</Title>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ width: "100%" }}
              label="Tahun Hijriah"
              onChangeText={(value) => handleChangeForm("year_hijriah", value)}
              mode="outlined"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="year_hijriah"
        />
        {errors.year_hijriah?.message ? (
          <Caption style={{ color: "red", alignItems: "flex-start" }}>
            {errors.year_hijriah?.message}
          </Caption>
        ) : (
          <View></View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: "5%",
          }}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ width: "100%", color: "#fff" }}
            mode="contained"
          >
            <Text style={{ color: "white" }}> Lanjutkan</Text>
          </Button>
        </View>
      </View>
    </View>
  );
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
    backgroundColor: "#28b5b5",
  },
});

export default BeriZakatFitrah;
