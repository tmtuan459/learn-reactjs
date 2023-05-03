import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";
import { useState } from "react";

const useStyle = makeStyles(() => ({
  root: {
    borderTop: "1px solid gray",
    padding: "8px",
  },

  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",

    margin: "8px 0",

    "& > span": {
      margin: "0 8px",
    },
  },
}));
FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyle();
  const [values, setValues] = useState({
    salePrice_gte: 0, // greater than equal
    salePrice_lte: 0, // less than equal
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    // sử dụng dạng callback
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(values);
    if (onChange) onChange(values);
    //setValues({ salePrice_gte: 0, salePrice_lte: 0 }); tùy // reset data sau khi submit
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2"> GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          name="salePrice_gte" // chú ý tên name chỗ này phải đúng để nhận dạng data
          value={values.salePrice_gte}
          onChange={handlechange}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handlechange}
        />
      </Box>

      <Button
        disabled={values.salePrice_gte === 0 || values.salePrice_lte === 0}
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
