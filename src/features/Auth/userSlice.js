import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);

  //save data to local storage
  localStorage.setItem("access_tokem", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  //return user data
  return data.user;
});

const userSlice = createSlice({
  //tạo ra obj có sẵn actions và reducer tương ứng
  name: "user",
  initialState: {
    current: {},
    settings: {},
  }, //bất kỳ kiểu dữ liệu nào muốn
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; // action.payload; = data.user
    },
  },
});

// Dùng object destructuring để lấy thông tin từ userSlice
const { reducer } = userSlice;

export default reducer; // default export
