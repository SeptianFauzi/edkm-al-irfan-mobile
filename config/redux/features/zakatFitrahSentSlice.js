import { createSlice } from "@reduxjs/toolkit";
import { GetStatusSelesaiZakatFitrahSent, GetStatusSisaZakatFitrahSent, GetDetailZakatFitrahSent, UpdateZakatFitrahSent } from "../services";
const initialState = {
    zakatFitrahSelesaiSent: false,
    zakatFitrahSisaSent: false,
    updateZakatFitrah: false,
    loadingSisaSent: false,
    loadingSelesaiSent: false,
    loadingData: false,
    loading: false,
    error: false,
    errorData: false,
    zakatFitrahSent: false,
}

const zakatFitrahSentSlice = createSlice({
    name: 'zakatFitrahSent',
    initialState,
    reducers: {
        resetErrorData: (state, action) => {
            state.errorData = false;
            state.error = false;
        }
    },
    extraReducers: {
        [GetDetailZakatFitrahSent.pending]: (state, action) => {
            state.error = false;
            state.loadingData = false;
            state.loading = true;
            state.updateZakatFitrahSent = false;
            state.errorData = false;
        },
        [GetDetailZakatFitrahSent.fulfilled]: (state, action) => {
            state.loading = false;
            state.loadingData = false;
            state.zakatFitrahSent = action.payload;
        },
        [GetDetailZakatFitrahSent.rejected]: (state, action) => {
            state.loading = false;
            state.loadingData = false;
            state.error = action.error;
        },
        [GetStatusSelesaiZakatFitrahSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSelesaiSent = true;
            state.loadingData = false;
            state.updateZakatFitrahSent = false;
            state.errorData = false;
            state.zakatFitrahSelesaiSent = false;
        },
        [GetStatusSelesaiZakatFitrahSent.fulfilled]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.zakatFitrahSelesaiSent = action.payload;
        },
        [GetStatusSelesaiZakatFitrahSent.rejected]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.error = action.error;
        },
        [GetStatusSisaZakatFitrahSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSisaSent = true;
            state.loadingData = false;
            state.updateZakatFitrahSent = false;
            state.errorData = false;
            state.zakatFitrahSisaSent = false;
        },
        [GetStatusSisaZakatFitrahSent.fulfilled]: (state, action) => {
            state.loadingSisaSent = false;
            state.zakatFitrahSisaSent = action.payload;
        },
        [GetStatusSisaZakatFitrahSent.rejected]: (state, action) => {
            state.loadingSisaSent = false;
            state.error = action.error;
        },
        [UpdateZakatFitrahSent.pending]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.loadingData = true;
            state.updateZakatFitrahSent = false;
            state.errorData = false;
        },
        [UpdateZakatFitrahSent.fulfilled]: (state, action) => {
            state.loadingData = false;
            state.updateZakatFitrahSent = action.payload;
        },
        [UpdateZakatFitrahSent.rejected]: (state, action) => {
            state.loadingData = false;
            state.errorData = action.error;
        }
    }
});

export const { resetErrorData } = zakatFitrahSentSlice.actions
export default zakatFitrahSentSlice.reducer



