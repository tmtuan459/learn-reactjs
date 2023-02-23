import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  //tạo ra obj có sẵn actions và reducer tương ứng
  name: "counter",
  initialState: 0, //bất kyf kiểu dữ liệu nào muốn
  reducers: {
    // là 1 obj mỗi key là 1 trường hợp(1 func)
    increase(state, action) {
      return state + 1;
    },
    decrease(state, action) {
      return state - 1;
    },
  },
});

// Dùng object destructuring để lấy thông tin từ counter slice
const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions; // named export
export default reducer; // default export
