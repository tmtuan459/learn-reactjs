import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/CounterSlice/counterSlice"; //default import thì tương ứng ở đây counterReducer = reducer bên slice
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";

//rootReducer sẽ bao gồm tất cả reducer mà có
const rootReducer = {
  count: counterReducer,
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
