import { Route } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch(); //lấy ra url của thằng cha

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage}></Route>
      </Switch>
    </Box>
  );
}

export default ProductFeature;
