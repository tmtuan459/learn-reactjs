import { Box, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink, useRouteMatch } from "react-router-dom";

ProductMenu.propTypes = {};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",

    padding: 0,
    listStyleType: "none",
    "& > li": {
      padding: "16px 32px",
      color: " red",
    },
    "& > li > a": {
      color: "gray",
      textDecoration: "none",
    },
    "& > li > a.active": {
      color: "#006699",
      textDecoration: "underline",
    },
  },
}));

function ProductMenu(props) {
  const { url } = useRouteMatch();
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
