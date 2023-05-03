import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from "./Filters/FilterByService";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (onChange) {
      const newFilter = {
        ...filters,
        "category.id": newCategoryId,
      };

      onChange(newFilter);
    }
  };

  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange}></FilterByPrice>
      <FilterByService
        filters={filters}
        onChange={handleChange}
      ></FilterByService>
    </Box>
  );
}

export default ProductFilters;
