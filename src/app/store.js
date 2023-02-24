import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/CounterSlice/counterSlice"; //default import thì tương ứng ở đây counterReducer = reducer bên slice
import userReducer from "../features/Auth/userSlice";
//rootReducer sẽ bao gồm tất cả reducer mà có
const rootReducer = {
  count: counterReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
