import { createSlice } from "@reduxjs/toolkit";
import { UpdateCelengan, GetStatusSelesaiMoneyBoxSent, GetStatusSisaMoneyBoxSent, GetDetailCelenganSent, UpdateCelenganSent } from "../services";
const initialState = {
    celenganSelesaiSent: false,
    celenganSisaSent: false,
    updateCelengan: false,
    loadingSisaSent: false,
    loadingSelesaiSent: false,
    loadingData: false,
    error: false,
    errorData: false,
}

const celenganSentSlice = createSlice({
    name: 'celenganSent',
    initialState,
    reducers: {
        resetErrorData: (state, action) => {
            state.errorData = false;
            state.error = false;
        }
    },
    extraReducers: {
        [GetDetailCelenganSent.pending]: (state, action) => {
            state.error = false;
            state.loading = true;
            state.loadingData = false;
            state.updateCelenganSent = false;
            state.errorData = false;
        },
        [GetDetailCelenganSent.fulfilled]: (state, action) => {
            state.loading = false;
            state.celenganSent = action.payload;
        },
        [GetDetailCelenganSent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [GetStatusSelesaiMoneyBoxSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSelesaiSent = true;
            state.loadingData = false;
            state.updateCelenganSent = false;
            state.errorData = false;
            state.celenganSelesaiSent = false;
        },
        [GetStatusSelesaiMoneyBoxSent.fulfilled]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.celenganSelesaiSent = action.payload;
        },
        [GetStatusSelesaiMoneyBoxSent.rejected]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.error = action.error;
        },
        [GetStatusSisaMoneyBoxSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSisaSent = true;
            state.loadingData = false;
            state.updateCelenganSent = false;
            state.errorData = false;
            state.celenganSisaSent = false;
        },
        [GetStatusSisaMoneyBoxSent.fulfilled]: (state, action) => {
            state.loadingSisaSent = false;
            state.celenganSisaSent = action.payload;
        },
        [GetStatusSisaMoneyBoxSent.rejected]: (state, action) => {
            state.loadingSisaSent = false;
            state.error = action.error;
        },
        [UpdateCelenganSent.pending]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.loadingData = true;
            state.updateCelenganSent = false;
            state.errorData = false;
        },
        [UpdateCelenganSent.fulfilled]: (state, action) => {
            state.loadingData = false;
            state.updateCelenganSent = action.payload;
        },
        [UpdateCelenganSent.rejected]: (state, action) => {
            state.loadingData = false;
            state.errorData = action.error;
        }
    }
});

export const { resetErrorData } = celenganSentSlice.actions
export default celenganSentSlice.reducer



