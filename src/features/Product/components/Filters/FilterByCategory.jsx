import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import categoryApi from "api/categoryApi";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "8px",
  },
  menu: {
    margin: "0 -.25rem",
    padding: "0 .25rem",
    listStyleType: "none",
    transition: "ease-in-out 0.2s",

    position: "relative",

    "& > li": {
      marginTop: "8px",
      position: "relative",
      "&:hover": {
        cursor: "pointer",
        color: "#54b3d6",
        "&:after": {
          content: "",
          position: "absolute",
          width: "100%",
          transform: "scaleX(0)",
          height: "2px",
          bottom: 0,
          left: 0,
          backgroundColor: "#0087ca",
          transformPrigin: "bottom right",
          transition: "transform 0.25s ease-out",
        },
      },
      "&:hover::after": {
        color: "red",
      },
    },
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const listCategoryApi = await categoryApi.getAll();
        // Vì trả về quá nhiều data nên có thể dùng cách dưới để giảm thiểu việc gán
        setCategoryList(
          listCategoryApi.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Failed to fetch Category List", error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variat="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
