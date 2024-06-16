import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Celengan Sent

export const GetStatusSisaMoneyBoxSent = createAsyncThunk(
  "celengan/getStatusSisaMoneyBoxSent",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelenganmoneyboxsent?is_money_box_sent=0&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const GetStatusSelesaiMoneyBoxSent = createAsyncThunk(
  "celengan/getStatusSelesaiMoneyBoxSent",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelenganmoneyboxsent?is_money_box_sent=1&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

export const GetDetailCelenganSent = createAsyncThunk(
  "celengan/getDetailCelenganSent",
  async ({ id_peserta, year_hijriah }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelengan?id_peserta=" +
        id_peserta +
        "&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const UpdateCelenganSent = createAsyncThunk(
  "celengan/updateCelenganSent",
  async ({ id_peserta, data }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put("/api/celengan/" + id_peserta, data, {
      headers: { "X-APITOKEN": token },
    });
    return response.data.data;
  }
);

// Celengan Received

export const GetStatusSisaMoneyBoxReceived = createAsyncThunk(
  "celengan/getStatusSisaMoneyBoxReceived",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelenganmoneyreceived?is_money_received=0&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const GetStatusSelesaiMoneyBoxReceived = createAsyncThunk(
  "celengan/getStatusSelesaiMoneyBoxReceived",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelenganmoneyreceived?is_money_received=1&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

export const GetDetailCelenganReceived = createAsyncThunk(
  "celengan/getDetailCelenganReceived",
  async ({ id_peserta, year_hijriah }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertacelengan?id_peserta=" +
        id_peserta +
        "&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const UpdateCelenganReceived = createAsyncThunk(
  "celengan/updateCelenganReceived",
  async ({ id_peserta, data }) => {
    console.log(data);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put("/api/celengan/" + id_peserta, data, {
      headers: { "X-APITOKEN": token },
    });
    return response.data.data;
  }
);

// Qurban
export const GetStatusSisaQurbanSent = createAsyncThunk(
  "qurban/getStatusSisaQurbanSent",
  async ({ year_hijriah, location }) => {
    if (location === "Semua") {
      location = "";
    }
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertaqurbansent?is_qurban_sent=0&year_hijriah=" +
        year_hijriah +
        "&location=" +
        location,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const GetStatusSelesaiQurbanSent = createAsyncThunk(
  "qurban/getStatusSelesaiQurbanSent",
  async ({ year_hijriah, location }) => {
    if (location === "Semua") {
      location = "";
    }
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertaqurbansent?is_qurban_sent=1&year_hijriah=" +
        year_hijriah +
        "&location=" +
        location,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

export const GetDetailQurbanSent = createAsyncThunk(
  "qurban/getDetailQurbanSent",
  async ({ id_peserta, year_hijriah }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertaqurban?id_peserta=" +
        id_peserta +
        "&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const UpdateQurbanSent = createAsyncThunk(
  "qurban/updateQurbanSent",
  async ({ id_peserta, data }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put("/api/qurbansent/" + id_peserta, data, {
      headers: { "X-APITOKEN": token },
    });
    return response.data.data;
  }
);

// Zakat Receivedd

export const GetStatusSisaZakatFitrahReceived = createAsyncThunk(
  "zakatfitrah/gretStatusSisaZakatFitrahReceived",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertazakatfitrahreceived?is_zakat_received=0&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const GetStatusSelesaiZakatFitrahReceived = createAsyncThunk(
  "zakatfitrah/getStatusSelesaiZakatFitrahReceived",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertazakatfitrahreceived?is_zakat_received=1&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

export const GetDetailZakatFitrahReceived = createAsyncThunk(
  "zakatfitrah/getDetailZakatFitrahReceived",
  async ({ id_peserta, year_hijriah }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuszakatfitrahreceived?id_peserta=" +
        id_peserta +
        "&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const UpdateZakatFitrahReceived = createAsyncThunk(
  "zakatfitrah/updateZakatFitrahReceived",
  async ({ id_peserta, data }) => {
    console.log(data);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      "/api/zakatfitrahreceived/" + id_peserta,
      data,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

// Zakat Sent

export const GetStatusSisaZakatFitrahSent = createAsyncThunk(
  "zakatfitrah/gretStatusSisaZakatFitrahSent",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertazakatfitrahsent?is_zakat_sent=0&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const GetStatusSelesaiZakatFitrahSent = createAsyncThunk(
  "zakatfitrah/getStatusSelesaiZakatFitrahSent",
  async (year_hijriah) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuspesertazakatfitrahsent?is_zakat_sent=1&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);

export const GetDetailZakatFitrahSent = createAsyncThunk(
  "zakatfitrah/getDetailZakatFitrahSent",
  async ({ id_peserta, year_hijriah }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "/api/statuszakatfitrahsent?id_peserta=" +
        id_peserta +
        "&year_hijriah=" +
        year_hijriah,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
export const UpdateZakatFitrahSent = createAsyncThunk(
  "zakatfitrah/updateZakatFitrahSent",
  async ({ id_peserta, data }) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      "/api/zakatfitrahsent/" + id_peserta,
      data,
      { headers: { "X-APITOKEN": token } }
    );
    return response.data.data;
  }
);
