import { createSlice } from "@reduxjs/toolkit";
import { GetStatusSelesaiQurbanSent, GetStatusSisaQurbanSent, GetDetailQurbanSent, UpdateQurbanSent } from "../services";
const initialState = {
    qurbanSelesaiSent: false,
    qurbanSisaSent: false,
    updateQurban: false,
    loadingSisaSent: false,
    loadingSelesaiSent: false,
    loadingData: false,
    error: false,
    errorData: false,
}

const qurbanSentSlice = createSlice({
    name: 'qurbanSent',
    initialState,
    reducers: {
        resetErrorData: (state, action) => {
            state.errorData = false;
            state.error = false;
        }
    },
    extraReducers: {
        [GetDetailQurbanSent.pending]: (state, action) => {
            state.error = false;
            state.loading = true;
            state.loadingData = false;
            state.updateQurbanSent = false;
            state.errorData = false;
        },
        [GetDetailQurbanSent.fulfilled]: (state, action) => {
            state.loading = false;
            state.qurbanSent = action.payload;
        },
        [GetDetailQurbanSent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [GetStatusSelesaiQurbanSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSelesaiSent = true;
            state.loadingData = false;
            state.updateQurbanSent = false;
            state.errorData = false;
            state.qurbanSelesaiSent = false;
        },
        [GetStatusSelesaiQurbanSent.fulfilled]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.qurbanSelesaiSent = action.payload;
        },
        [GetStatusSelesaiQurbanSent.rejected]: (state, action) => {
            state.loadingSelesaiSent = false;
            state.error = action.error;
        },
        [GetStatusSisaQurbanSent.pending]: (state, action) => {
            state.error = false;
            state.loadingSisaSent = true;
            state.loadingData = false;
            state.updateQurbanSent = false;
            state.errorData = false;
            state.qurbanSisaSent = false;
        },
        [GetStatusSisaQurbanSent.fulfilled]: (state, action) => {
            state.loadingSisaSent = false;
            state.qurbanSisaSent = action.payload;
        },
        [GetStatusSisaQurbanSent.rejected]: (state, action) => {
            state.loadingSisaSent = false;
            state.error = action.error;
        },
        [UpdateQurbanSent.pending]: (state, action) => {
            state.error = false;
            state.loading = false;
            state.loadingData = true;
            state.updateQurbanSent = false;
            state.errorData = false;
        },
        [UpdateQurbanSent.fulfilled]: (state, action) => {
            state.loadingData = false;
            state.updateQurbanSent = action.payload;
        },
        [UpdateQurbanSent.rejected]: (state, action) => {
            state.loadingData = false;
            state.errorData = action.error;
        }
    }
});

export const { resetErrorData } = qurbanSentSlice.actions
export default qurbanSentSlice.reducer



