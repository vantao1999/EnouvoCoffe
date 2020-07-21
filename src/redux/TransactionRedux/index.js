import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';
import _ from 'lodash';

const tranSlice = createSlice({
  name: 'trans',
  initialState: {
    loading: false,
    transLoading: false,
    plusLoading: false,
    listHistoryTransferOut: [],
    listHistoryTransferIn: [],
    historyData: [],
    listHistoryTransactionIn: [],
    listHistoryTransactionOut: [],
    //Admin
    errMessage: null,
    errTrans: null,
    listAdminHistoryIn: [],
    listAdminHistoryOut: [],
  },
  reducers: {},
  extraReducers: {
    // User Transfer Money
    [operations.transferMoney.pending]: (state) => {
      state.transLoading = true;
    },
    [operations.transferMoney.fulfilled]: (state, { payload }) => {
      state.transLoading = false;
    },
    [operations.transferMoney.rejected]: (state, { payload }) => {
      state.transLoading = false;
      state.errTrans = payload.message;
    },
    //History Transfer Out
    [operations.userHistoryTransferOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.userHistoryTransferOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listHistoryTransferOut = payload.data;
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
      state.historyData = payload;
      state.listHistoryTransferIn = state.listHistoryTransferIn.concat(payload.data);
      // console.log('listHistoryTransferIn', state.listHistoryTransferIn);
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
      state.listHistoryTransactionIn = payload.data;
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
      state.listHistoryTransactionOut = payload.data;
    },
    [operations.getUserHistoryOut.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    /******************************************/
    /************ Side Admin *************/
    /******************************************/
    [operations.plusMoney.pending]: (state) => {
      state.plusLoading = true;
    },
    [operations.plusMoney.fulfilled]: (state, { payload }) => {
      state.plusLoading = false;
      state.errMessage = payload;
    },
    [operations.plusMoney.rejected]: (state, { payload }) => {
      state.plusLoading = false;
      state.errMessage = payload;
    },
    //Minus
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
