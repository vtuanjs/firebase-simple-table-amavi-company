import { createSelector } from 'reselect'

export const firestoreSeclector = createSelector(
    state => state.firestore,
    firestore => firestore
)

export const authSelector = createSelector(
    state => state.firebase.auth,
    auth => auth
)