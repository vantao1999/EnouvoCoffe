import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';
import _ from 'lodash';
import { logOut } from '../UserRedux/operations';

const tranSlice = createSlice({
  name: 'trans',
  initialState: {
    loading: false,
    transLoading: false,
    plusLoading: false,

    listHistoryTransferOut: [],
    dataHistoryTransferOut: [],

    listHistoryTransferIn: [],
    dataHistoryTransferIn: [],

    listHistoryTransactionIn: [],
    dataHistoryTransactionIn: [],

    listHistoryTransactionOut: [],
    dataHistoryTransactionOut: [],
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
    [operations.getTransferOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.getTransferOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dataHistoryTransferOut = payload;
      state.listHistoryTransferOut = state.listHistoryTransferOut.concat(payload.data);
    },
    [operations.getTransferOut.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //History Transfer In
    [operations.getTransferIn.pending]: (state) => {
      state.loading = true;
    },
    [operations.getTransferIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dataHistoryTransferIn = payload;
      state.listHistoryTransferIn = state.listHistoryTransferIn.concat(payload.data);
      // console.log('listHistoryTransferIn', state.listHistoryTransferIn);
    },
    [operations.getTransferIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //History Transaction In
    [operations.getTransactionIn.pending]: (state) => {
      state.loading = true;
    },
    [operations.getTransactionIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dataHistoryTransactionIn = payload;
      state.listHistoryTransactionIn = state.listHistoryTransactionIn.concat(payload.data);
    },
    [operations.getTransactionIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //History Transaction Out
    [operations.getTransactionOut.pending]: (state) => {
      state.loading = true;
    },
    [operations.getTransactionOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dataHistoryTransactionOut = payload;
      state.listHistoryTransactionOut = state.listHistoryTransactionOut.concat(payload.data);
    },
    [operations.getTransactionOut.rejected]: (state, { payload }) => {
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
    [logOut.fulfilled]: (state) => {
      // state = { ...state, state: {} };
      state.dataHistoryTransactionIn = [];
      state.listHistoryTransactionIn = [];
      state.dataHistoryTransactionOut = [];
      state.listHistoryTransactionOut = [];
      state.dataHistoryTransferIn = [];
      state.listHistoryTransferIn = [];
      state.dataHistoryTransferOut = [];
      state.listHistoryTransferOut = [];
    },
  },
});
export const { actions, reducer } = tranSlice;
export default reducer;
