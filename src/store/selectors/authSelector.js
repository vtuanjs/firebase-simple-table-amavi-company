import { createSelector } from "reselect";

export const authSelector = createSelector(
  state => state.firebase.auth,
  auth => auth
);
