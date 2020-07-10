import { createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthApis from '../../api/auth';
// import { NavigationUtils } from '../../navigation';

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.login(data);

    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }
    return rejectWithValue(err.data);
  }
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.register(data);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }

    return rejectWithValue(err.data);
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.forgotPasswordApi(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/confirmCode',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.resetPasswordApi(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const uploadImage = createAsyncThunk(
  'user/uploadImageProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthApis.uploadImageProfile(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }

      return rejectWithValue(err.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  '/client/users/me/updateProfile',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.updateProfile(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export const getAccount = createAsyncThunk(
  'client/users/accountbalance',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.accountBalance(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
//Admin Doing
export const getMany = createAsyncThunk(
  'admin/users/getListUser',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);

      const response = await AuthApis.getMany(data);
      return response?.data;
    } catch (err) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export const createOne = createAsyncThunk(
  'admin/users/addNewUser',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.createOne(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export const getOne = createAsyncThunk(
  'admin/users',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.getOne(userId);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export const updateOne = createAsyncThunk(
  'admin/users/update',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      console.log('aaaa', data);
      const userData = {
        username: data.username,
        address: data.address,
        phone: data.phone,
      };
      const response = await AuthApis.updateOne(data.userId, userData);
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

export const disable = createAsyncThunk(
  'admin/disable/',
  async (data, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().auth.token;
      await AuthApis.setToken(accessToken);
      const response = await AuthApis.disable(data);
      return response?.data;
    } catch (err) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);
