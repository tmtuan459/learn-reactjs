import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../../../Components/NotFound";
import DetailPage from "./DetailPage";
import ListPage from "./ListPage";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch(); // This is nested routing: get path từ parent: thì thay đổi ở cha con tự động mapping:

  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
