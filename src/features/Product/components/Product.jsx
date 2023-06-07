import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constants/index";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatPrice } from "utils";

Product.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles(() => ({
  box: {
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.2); ",
      borderRadius: "5px",
      cursor: "pointer",
    },
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : `${THUMBNAIL_PLACEHOLDER}`;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };
  // console.log(product.id);
  return (
    <Box padding={1} className={classes.box} onClick={handleClick}>
      {/* <Skeleton variant="rectangular" width="100%" height={118} /> */}
      {/* mặc định thẻ img sẽ show kích thước thật của ảnh nên chỉ định witdh prop */}
      {/* https://api.ezfrontend.com/uploads/9ff7d29c2ebad4fd802685eb770d9452_417240087a.jpg */}
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {/* coppy intl number format https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat */}
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
