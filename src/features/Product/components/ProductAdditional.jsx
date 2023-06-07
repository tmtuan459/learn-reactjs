import { Paper } from "@mui/material";
import PropTypes from "prop-types";

ProductAdditional.propTypes = {
  product: PropTypes.object,
};

function ProductAdditional({ product = {} }) {
  return <Paper elevation={0} style={{ padding: "15px" }}></Paper>;
}

export default ProductAdditional;
