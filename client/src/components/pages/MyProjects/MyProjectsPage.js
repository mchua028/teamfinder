import React from 'react';

import { useRouteMatch, Switch, Route } from "react-router-dom";

import AddProject from "./AddProject";
import MyProjects from "./MyProjects";
import ProjectDetails from "./ProjectDetails";
import EditProject from './EditProject';

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
      <Route path={`${path}/:projectId/edit`}>
        <EditProject />
      </Route>
      <Route path={`${path}/:projectId`}>
        <ProjectDetails />
      </Route>
    </Switch>
  );
}
