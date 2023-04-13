import {createSlice} from '@reduxjs/toolkit';
import {
  GetStatusSelesaiMoneyBoxReceived,
  GetStatusSisaMoneyBoxReceived,
  GetDetailCelenganReceived,
  UpdateCelenganReceived,
} from '../services';
const initialState = {
  celenganSelesaiReceived: false,
  celenganSisaReceived: false,
  updateCelengan: false,
  loadingSisaReceived: false,
  loadingSelesaiReceived: false,
  loadingData: false,
  loading: false,
  error: false,
  errorData: false,
  celenganReceived: false,
};

const celenganReceivedSlice = createSlice({
  name: 'celenganReceived',
  initialState,
  reducers: {
    resetErrorData: (state, action) => {
      state.errorData = false;
      state.error = false;
    },
  },
  extraReducers: {
    [GetDetailCelenganReceived.pending]: (state, action) => {
      state.error = false;
      state.loadingData = false;
      state.loading = true;
      state.updateCelenganReceived = false;
      state.errorData = false;
    },
    [GetDetailCelenganReceived.fulfilled]: (state, action) => {
      state.loading = false;
      state.loadingData = false;
      state.celenganReceived = action.payload;
    },
    [GetDetailCelenganReceived.rejected]: (state, action) => {
      state.loading = false;
      state.loadingData = false;
      state.error = action.error;
    },
    [GetStatusSelesaiMoneyBoxReceived.pending]: (state, action) => {
      state.error = false;
      state.loadingSelesaiReceived = true;
      state.loadingData = false;
      state.updateCelenganReceived = false;
      state.errorData = false;
      state.celenganSelesaiReceived = false;
    },
    [GetStatusSelesaiMoneyBoxReceived.fulfilled]: (state, action) => {
      state.loadingSelesaiReceived = false;
      state.celenganSelesaiReceived = action.payload;
    },
    [GetStatusSelesaiMoneyBoxReceived.rejected]: (state, action) => {
      state.loadingSelesaiReceived = false;
      state.error = action.error;
    },
    [GetStatusSisaMoneyBoxReceived.pending]: (state, action) => {
      state.error = false;
      state.loadingSisaReceived = true;
      state.loadingData = false;
      state.updateCelenganReceived = false;
      state.errorData = false;
      state.celenganSisaReceived = false;
    },
    [GetStatusSisaMoneyBoxReceived.fulfilled]: (state, action) => {
      state.loadingSisaReceived = false;
      state.celenganSisaReceived = action.payload;
    },
    [GetStatusSisaMoneyBoxReceived.rejected]: (state, action) => {
      state.loadingSisaReceived = false;
      state.error = action.error;
    },
    [UpdateCelenganReceived.pending]: (state, action) => {
      state.error = false;
      state.loading = false;
      state.loadingData = true;
      state.updateCelenganReceived = false;
      state.errorData = false;
    },
    [UpdateCelenganReceived.fulfilled]: (state, action) => {
      state.loadingData = false;
      state.updateCelenganReceived = action.payload;
    },
    [UpdateCelenganReceived.rejected]: (state, action) => {
      state.loadingData = false;
      state.errorData = action.error;
    },
  },
});

export const {resetErrorData} = celenganReceivedSlice.actions;
export default celenganReceivedSlice.reducer;
