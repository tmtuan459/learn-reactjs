import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Chip } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    paddingLeft: "5px",

    margin: "16px 0",
    listStyleType: "none",

    "& > li": {
      margin: 0,
      padding: "8px",
    },
  },
}));

// Tạo ra bộ config custom filters
const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip, // hiển thị màu chip
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters }; //clone từ bộ filters hiện tại
      if (newFilters.isFreeShip) {
        // nếu đang bật thì toogle=  xóa
        delete newFilters.isFreeShip;
        // newFilters.isFreeShip = false; cách này cũng đc
      } else {
        //ngược lại thì add vào
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true, // hiển thị màu chip, auto true, vì ko toggle đc
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }; // clone filters
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null, // không thể nào toggle nên để null vẫn đc
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true, // hiển thị màu chip, auto true, vì ko toggle đc
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters };
      delete newFilter.salePrice_lte;
      delete newFilter.salePrice_gte;
      return newFilter;
    },
    onToggle: null, // không thể nào toggle nên để null vẫn đc
  },
  //   {
  //     id: 4,
  //     getLabel: (filters) => "Danh mục",
  //     isActive: () => true, // hiển thị màu chip, auto true, vì ko toggle đc
  //     isVisible: (filters) => Object.keys(filters).includes("category.id"),
  //     isRemovable: true,
  //     onRemove: (filters) => {
  //       const newFilter = { ...filters };
  //       newFilter.category.id.values(null);

  //       return newFilter;
  //     },
  //     onToggle: null, // không thể nào toggle nên để null vẫn đc
  //   },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  //filters = {} đây là cách set default theo kiểu ES6, ko xài. defaultProps nữa
  const classes = useStyles();

  // dùng useMemo để cải thiện performance, phòng hợp case thằng cha re-render trigger thằng con re-render theo, vì vậy ta dùng useMemo để hạn chế việc re-render
  // FILTER_LIST chỉ cần tính lại khi props filters thay đổi
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map(
        // chỗ này có nghĩa: lọc ra thằng nào visible thì truyền vào cáo filter đó vào map
        (x) => (
          <li key={x.id}>
            <Chip
              label={x.getLabel(filters)}
              color={x.isActive(filters) ? "primary" : "default"}
              clickable={!x.isRemovable}
              onClick={
                x.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return; // onchange ko truyền xuống thì k làm gì cả

                      const newFilters = x.onToggle(filters); // lấy bộ newFilter bằng cách gọi hàm x.onToggle(phía trên) truyền vào cái filters hiện tại
                      onChange(newFilters);
                    }
              }
              onDelete={
                x.isRemovable
                  ? () => {
                      if (!onChange) return; // onchange ko truyền xuống thì k làm gì cả

                      const newFilters = x.onRemove(filters);
                      onChange(newFilters);
                    }
                  : null
              }
            ></Chip>
          </li>
        )
      )}
    </Box>
  );
}

export default FilterViewer;
