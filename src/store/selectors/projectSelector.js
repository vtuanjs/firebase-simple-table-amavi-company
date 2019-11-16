import { createSelector } from "reselect";

export const projectsSelector = createSelector(
  state => state.firestore.ordered.projects,
  projects => projects
);

export const projectSelector = createSelector(
  state => state.firestore.ordered.filterProjects,
  filterProjects => filterProjects ? filterProjects[0] : null
);
