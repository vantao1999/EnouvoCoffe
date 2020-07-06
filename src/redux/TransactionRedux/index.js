import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const tranSlice = createSlice({
  name: 'trans',
  initialState: {
    loading: false,
    listHistoryTransfer: [],
    listHistoryTransferIn: [],
    listHistoryTransactionIn: [],
    listHistoryTransactionOut: [],
    //Admin
    errMessage: null,
    listAdminHistoryIn: [],
    listAdminHistoryOut: [],
  },
  reducers: {},
  extraReducers: {
    // User Transfer Money
    [operations.transferMoney.pending]: (state) => {
      state.loading = true;
    },
    [operations.transferMoney.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listUser = payload;
    },
    [operations.transferMoney.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //History Transfer Out
    [operations.userHistoryTransferOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.userHistoryTransferOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listHistoryTransfer = payload;
    },
    [operations.userHistoryTransferOut.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //History Transfer In
    [operations.userHistoryTransferIn.pending]: (state) => {
      state.loading = true;
    },
    [operations.userHistoryTransferIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listHistoryTransferIn = payload;
    },
    [operations.userHistoryTransferIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //History Transaction In
    [operations.getUserHistoryIn.pending]: (state) => {
      state.loading = true;
    },
    [operations.getUserHistoryIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listHistoryTransactionIn = payload;
    },
    [operations.getUserHistoryIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //History Transaction Out
    [operations.getUserHistoryOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.getUserHistoryOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listHistoryTransactionOut = payload;
    },
    [operations.getUserHistoryOut.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    /******************************************/
    /************ Side Admin *************/
    /******************************************/
    [operations.plusMoney.pending]: (state) => {
      state.loading = true;
    },
    [operations.plusMoney.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    [operations.plusMoney.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    [operations.minusMoney.pending]: (state) => {
      state.loading = true;
    },
    [operations.minusMoney.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload;
    },
    [operations.minusMoney.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.message;
    },
    //History when plus money
    [operations.getHistoryIn.pending]: (state) => {
      state.loading = true;
    },
    [operations.getHistoryIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listAdminHistoryIn = payload;
    },
    [operations.getHistoryIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //History when minus money
    [operations.getHistoryOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.getHistoryOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listAdminHistoryOut = payload;
    },
    [operations.getHistoryOut.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});
export const { actions, reducer } = tranSlice;
export default reducer;
