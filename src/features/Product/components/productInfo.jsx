import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatPrice } from "utils";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: "16px",
    borderBottom: "1px solid rgb(243 244 246)",
  },

  description: {
    margin: "16px 8px !important",
  },

  priceBox: {
    padding: "24px",
    backgroundColor: "rgb(243 244 246)",
  },

  salePrice: {
    fontSize: "20px",
    marginRight: "15px",
  },

  originalPrice: {
    fontSize: "13px",
    textDecoration: "line-through",
    marginRight: "24px",
  },
}));

function ProductInfo({ product = {} }) {
  // { product = {} } thay cho vieets defaul props

  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product; // {name, shortDescription, salePrice, originalPrice, promotionPercent} check trong api và lấy ra

  return (
    <Box className={classes.root}>
      <Typography variant="h4">{name}</Typography>

      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span">{` - ${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
