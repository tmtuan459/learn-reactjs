import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import DetailPage from "./DetailPage";
import ListPage from "./ListPage";



TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch(); // This is nested routing: get path từ parent: thì thay đổi ở cha con tự động mapping: 
  
  return (
    <div>
      <Route path={match.path} component={ListPage} exact/>
      <Route path={`${match.path}/:todoId`} component={DetailPage} />
    </div>
  );
}

export default TodoFeature;
