import React from 'react';

import { useRouteMatch, Switch, Route } from "react-router-dom";

import AddProject from "./AddProject";
import MyProjects from "./MyProjects";

export default function MyProjectsPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <MyProjects />
      </Route>
      <Route path={`${path}/add-project`}>
        <AddProject />
      </Route>
    </Switch>
  );
}
