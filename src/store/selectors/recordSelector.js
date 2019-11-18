import { createSelector } from "reselect";

export const recordsSelector = createSelector(
  state => state.firestore.ordered.records,
  records => records
);

export const recordSelector = createSelector(
  state => state.firestore.ordered.filterRecords,
  record => record ? record[0] : null
);
