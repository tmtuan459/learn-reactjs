import { createSelector } from "@reduxjs/toolkit";
// Khi gặp những trường hợp tính toán phụ thuộc vào state thì có thể dùng selector
const cartItemSelector = (state) => state.cart.cartList; // input ko thay đổi thì sẽ không tính toán lại

// Count number of product in cart List
export const cartItemsCountSelector = createSelector(
  // syntax của nó như thế này, có nhiều cách viết
  cartItemSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0) // 0 là giá trị ban đầu
);
// Calculate total of cart List
export const cartTotalSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce(
    (total, item) => total + item.product.salePrice * item.quantity,
    0
  )
);
