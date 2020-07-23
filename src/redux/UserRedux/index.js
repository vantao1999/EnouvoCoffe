import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    getManyLoading: false,
    location: null,
    fcmToken: null,
    token: null,
    listUser: [],
    account: null,
    data: null,
  },
  reducers: {
    login: (state, action) => {},
    register: (state, action) => {},
    getMe: (state, action) => {
      state.user = action.data;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Using user to check at Setup file
    },
    updateProfile: (state) => {},
  },
  extraReducers: {
    [operations.login.pending]: (state) => {
      state.loading = true;
    },
    [operations.login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.token = payload.token;
    },
    [operations.login.rejected]: (state) => {
      state.loading = false;
    },

    [operations.register.pending]: (state) => {
      state.loading = true;
    },
    [operations.register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [operations.register.rejected]: (state) => {
      state.loading = false;
    },

    [operations.updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [operations.updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload[0];
    },
    [operations.getMany.pending]: (state) => {
      state.getManyLoading = true;
    },
    [operations.getMany.fulfilled]: (state, { payload }) => {
      state.getManyLoading = false;
      state.listUser = payload;
    },
    [operations.getMany.rejected]: (state) => {
      state.getManyLoading = false;
    },
    [operations.getAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.account = payload;
    },
    [operations.logOut.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
      // state = { ...state, state: null };
      // console.log('LogUSerWhenLogOut', state);
    },
  },
});

export const { actions, reducer } = authSlice;
export default reducer;
