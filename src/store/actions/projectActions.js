import {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR
} from "../dataTypes/projectType";

export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        roles: {
          [authorId]: 'owner'
        },
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: CREATE_PROJECT_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: CREATE_PROJECT_ERROR }, err);
      });
  };
};

export const deleteProject = projectId => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(projectId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_PROJECT_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: DELETE_PROJECT_ERROR }, err);
      });
  };
};

export const updateProject = (id, project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .update(project)
      .then(() => {
        dispatch({ type: UPDATE_PROJECT_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: UPDATE_PROJECT_ERROR }, err);
      });
  };
};
