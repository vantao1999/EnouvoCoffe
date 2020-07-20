import { createAsyncThunk } from '@reduxjs/toolkit';
import * as TransApis from '../../api/trans';

export const transferMoney = createAsyncThunk(
  'client/users/me/transactionTransfer',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        receiverId: data.userId,
        payment: data.payment,
        notes: data.notes,
      };
      const response = await TransApis.transferMoney(userData);
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
  'client/users/me/transfer/out',
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
  'client/users/me/transfer/in',
  async ({ page }, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      console.log('userHistoryTransferIn', page);
      const response = await TransApis.getHistoryTransferIn(page);
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
  'client/users/me/transactions/in',
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
  'client/users/me/transactions/out',
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
  'admin/transactions/plus',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        receiverId: data.userId,
        payment: data.payment,
        notes: data.notes,
        type: 'plus',
      };
      const response = await TransApis.plusMoney(userData);
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
  'admin/transactions/minus',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await TransApis.setToken(accessToken);
      const userData = {
        receiverId: data.userId,
        payment: data.payment,
        notes: data.notes,
        type: 'minus',
      };
      const response = await TransApis.minusMoney(userData);
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
  'admin/transactions/In',
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
  'admin/transactions/Out',
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
