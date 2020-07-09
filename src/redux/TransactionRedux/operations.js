import { createAsyncThunk } from '@reduxjs/toolkit';
import * as TransApis from '../../api/trans';

export const transferMoney = createAsyncThunk(
  'client/transactionTransfer',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        payment: data.payment,
        notes: data.notes,
      };
      const response = await TransApis.transferMoney(data.userId, userData);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        console.log(err.data);
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

//getHistory User transfer
export const userHistoryTransferOut = createAsyncThunk(
  'client/transactionOut/history',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.getHistoryTransferOut(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
export const userHistoryTransferIn = createAsyncThunk(
  'client/transactionIn/history',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.getHistoryTransferIn(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
// User getHistory side admin doing
export const getUserHistoryIn = createAsyncThunk(
  'client/transactionTransfer/historyTransferIn',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.getHistoryTransactionIn(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
export const getUserHistoryOut = createAsyncThunk(
  'client/transactionTransfer/historyTransferOut',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.getHistoryTransactionOut(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
/******************************************/
/************ Side Admin *************/
/******************************************/

export const plusMoney = createAsyncThunk(
  'admin/transactions/changeMoney',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        payment: data.payment,
        notes: data.notes,
      };
      const response = await TransApis.plusMoney(data.userId, userData);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        console.log(err.data);
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
export const minusMoney = createAsyncThunk(
  'admin/transactions/changeMoney',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        payment: data.payment,
        notes: data.notes,
      };
      const response = await TransApis.minusMoney(data.userId, userData);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        console.log(err.data);
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

// Admin getHistory for action plus and minus
export const getHistoryIn = createAsyncThunk(
  'admin/transactionIn',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.adminGetHistoryTransactionIn(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
export const getHistoryOut = createAsyncThunk(
  'admin/transactionOut',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const response = await TransApis.adminGetHistoryTransactionOut(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
