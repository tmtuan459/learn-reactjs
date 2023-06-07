import { Grid, LinearProgress, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, Container } from "@mui/system";
import { addToCart } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import ProductAdditional from "../components/ProductAdditional";
import ProductDescription from "../components/ProductDescription";
import ProductMenu from "../components/ProductMenu";
import ProductReviews from "../components/ProductReviews";
import ProductThumbnail from "../components/ProductThumbnail";
import ProductInfo from "../components/productInfo";
import useProductDetail from "../hooks/useProductDetail";

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "24px",
  },

  left: {
    width: "400px",
    padding: "12px",
    borderRight: "1px solid grey",
  },

  right: {
    flex: "1 1 0",
  },

  loading: {
    position: "fixed",
    top: "64px",
    left: 0,
    width: "100%",
  },
}));
function DetailPage(props) {
  const classes = useStyles();

  // const { id } = useParams(); có thể dùng cách này để get id từ url phía route vứt lên
  const {
    url,
    params: { id },
  } = useRouteMatch(); //ObjDestructuring, nested 2 tầng
  //cách khác để get id từ url
  // const { pathname } = useLocation();
  // const productId = pathname.split("/")[2];

  // useProductDetail: tách ra custom hook, để giảm bớt code hoặc re-use able
  const { product, loading } = useProductDetail(id);
  const dispatch = useDispatch();

  const handleAddToCartFormSubmit = (formValues) => {
    // console.log("Form Submit", formValues);
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    console.log(action);
    dispatch(action);
  };

  if (loading) {
    // tạo 1 flag để check loading data khi nào xong
    return (
      <Box className={classes.loading}>
        <LinearProgress></LinearProgress>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product}></ProductThumbnail>
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product}></ProductInfo>
              <AddToCartForm
                onSubmit={handleAddToCartFormSubmit}
              ></AddToCartForm>
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          {/* nó recomended dùng cái này nhưng nên truyền 1 tầng, quá nhiều thì xài context, or reduxt */}
          <Route exact path={url}>
            <ProductDescription product={product}></ProductDescription>
          </Route>
          <Route
            path={`${url}/additional`}
            component={ProductAdditional}
          ></Route>
          <Route path={`${url}/reviews`} component={ProductReviews}></Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
