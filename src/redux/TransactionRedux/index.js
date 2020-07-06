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
  },
});
export const { actions, reducer } = tranSlice;
export default reducer;
