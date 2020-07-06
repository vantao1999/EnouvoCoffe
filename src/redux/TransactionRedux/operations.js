import { createAsyncThunk } from '@reduxjs/toolkit';
import * as TransApis from '../../api/trans';

export const transferMoney = createAsyncThunk(
  'user/transaction/transactionTransfer',
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
  'user/transaction/historyTransferOut',
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
  'user/transaction/historyTransferIn',
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
  'user/transaction/historyTransactionIn',
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
  'user/transaction/historyTransactionOut',
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
  'admin/transaction/plusMoney',
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
  'admin/transaction/minusMoney',
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
  'user/transaction/historyTransactionIn',
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
  'user/transaction/historyTransactionOut',
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
