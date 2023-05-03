import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onchange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    // check xem thằng cha có truyền xuống thì mới chạy
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
