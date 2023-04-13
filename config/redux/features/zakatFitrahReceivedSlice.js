import { createSlice } from "@reduxjs/toolkit";
import { GetStatusSelesaiZakatFitrahReceived, GetStatusSisaZakatFitrahReceived, GetDetailZakatFitrahReceived, UpdateZakatFitrahReceived } from "../services";
const initialState = {
    zakatFitrahSelesaiReceived: false,
    zakatFitrahSisaReceived: false,
    updateZakatFitrah: false,
    loadingSisaReceived: false,
    loadingSelesaiReceived: false,
    loadingData: false,
    loading: false,
    error: false,
    errorData: false,
    zakatFitrahReceived: false,
}

const zakatFitrahReceivedSlice = createSlice({
    name: 'zakatFitrahReceived',
    initialState,
    reducers: {
        resetErrorData: (state, action) => {
            state.errorData = false;
            state.error = false;
        }
    },
    extraReducers: {
        [GetDetailZakatFitrahReceived.pending]: (state, action) => {
            state.error = false;
            state.loadingData = false;
            state.loading = true;
            state.updateZakatFitrahReceived = false;
            state.errorData = false;
            state.zakatFitrahReceived = false
        },
        [GetDetailZakatFitrahReceived.fulfilled]: (state, action) => {
            state.loading = false;
            state.loadingData = false;
            state.zakatFitrahReceived = action.payload;
        },
        [GetDetailZakatFitrahReceived.rejected]: (state, action) => {
            state.loading = false;
            state.loadingData = false;
            state.error = action.error;
        },
        [GetStatusSelesaiZakatFitrahReceived.pending]: (state, action) => {
            state.error = false;
            state.loadingSelesaiReceived = true;
            state.loadingData = false;
            state.updateZakatFitrahReceived = false;
            state.errorData = false;
            state.zakatFitrahSelesaiReceived = false;
            state.zakatFitrahReceived = false
        },
        [GetStatusSelesaiZakatFitrahReceived.fulfilled]: (state, action) => {
            state.loadingSelesaiReceived = false;
            state.zakatFitrahSelesaiReceived = action.payload;
        },
        [GetStatusSelesaiZakatFitrahReceived.rejected]: (state, action) => {
            state.loadingSelesaiReceived = false;
            state.error = action.error;
        },
        [GetStatusSisaZakatFitrahReceived.pending]: (state, action) => {
            state.error = false;
            state.loadingSisaReceived = true;
            state.loadingData = false;
            state.updateZakatFitrahReceived = false;
            state.errorData = false;
            state.zakatFitrahSisaReceived = false;
            state.zakatFitrahReceived = false
        },
        [GetStatusSisaZakatFitrahReceived.fulfilled]: (state, action) => {
            state.loadingSisaReceived = false;
            state.zakatFitrahSisaReceived = action.payload;
        },
        [GetStatusSisaZakatFitrahReceived.rejected]: (state, action) => {
            state.loadingSisaReceived = false;
            state.error = action.error;
        },
        [UpdateZakatFitrahReceived.pending]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.loadingData = true;
            state.updateZakatFitrahReceived = false;
            state.errorData = false;
        },
        [UpdateZakatFitrahReceived.fulfilled]: (state, action) => {
            state.loadingData = false;
            state.updateZakatFitrahReceived = action.payload;
        },
        [UpdateZakatFitrahReceived.rejected]: (state, action) => {
            state.loadingData = false;
            state.errorData = action.error;
        }
    }
});

export const { resetErrorData } = zakatFitrahReceivedSlice.actions
export default zakatFitrahReceivedSlice.reducer



