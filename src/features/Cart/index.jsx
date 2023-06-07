import { Box, Grid, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { cartTotalSelector } from "./selectors";
import { formatPrice } from "utils";
import { STATIC_HOST } from "constants";
import { THUMBNAIL_PLACEHOLDER } from "constants";

CartFeature.propTypes = {};

function CartFeature() {
  const totalPrice = useSelector(cartTotalSelector);
  const cartList = useSelector((state) => state.cart.cartList); //  sử dụng React Redux để truy cập vào state trong Redux store và lấy dữ liệu từ cartList

  return (
    <Box style={{ padding: "0px 50px" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <h1 style={{ display: "block" }}>Giỏ Hàng</h1>
        <h2
          style={{
            display: "block",
            marginRight: "20px",
            color: "Highlight",
          }}
        >
          {formatPrice(totalPrice)}
        </h2>
      </Stack>

      {/* Header List */}
      <Paper elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ paddingLeft: "10px" }}>Tất cả</div>
          </Grid>
          <Grid item xs={2}>
            <div>Đơn giá</div>
          </Grid>
          <Grid item xs={2}>
            <div>Số lượng</div>
          </Grid>
          <Grid item xs={2}>
            <div>Thành tiền</div>
          </Grid>
        </Grid>
      </Paper>
      {/*  List Item */}
      <Paper elevation={0} style={{ marginTop: "10px" }}>
        <Grid container>
          {cartList.map((item) => (
            <Grid container spacing={2} key={item.id}>
              <Grid item xs={6} style={{ display: "flex" }}>
                <Grid item xs={3}>
                  <Box>
                    <img
                      src={
                        item.product.thumbnail
                          ? `${STATIC_HOST}${item.product.thumbnail?.url}`
                          : `${THUMBNAIL_PLACEHOLDER}`
                      }
                      alt={item.product.name}
                      width="100%"
                    />
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box style={{ padding: "10px" }}>
                    {item.product.shortDescription}
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <div>{formatPrice(item.product.salePrice)}</div>
              </Grid>
              <Grid item xs={2}>
                <div>{item.quantity}</div>
              </Grid>
              <Grid item xs={2}>
                <div>{formatPrice(item.product.salePrice * item.quantity)}</div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

export default CartFeature;
