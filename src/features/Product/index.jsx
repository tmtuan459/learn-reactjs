import { Box } from "@mui/material";
import { Switch, useRouteMatch } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch(); //lấy ra url của thằng cha

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage}></Route>
        <Route path={`${match.url}/:id`} component={DetailPage}></Route>
        {/* :id gióng như trong api */}
      </Switch>
    </Box>
  );
}

export default ProductFeature;
