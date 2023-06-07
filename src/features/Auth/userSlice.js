import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-key";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);

  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);

  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

const userSlice = createSlice({
  //tạo ra obj có sẵn actions và reducer tương ứng
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  }, //bất kỳ kiểu dữ liệu nào muốn
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: {
    //xử lý
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; // action.payload; = data.user
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload; // action.payload; = data.user
    },
  },
});

// Dùng object destructuring để lấy thông tin từ userSlice
const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer; // default export
