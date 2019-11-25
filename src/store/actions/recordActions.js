import {
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_ERROR,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_ERROR,
  UPDATE_RECORD_SUCCESS,
  UPDATE_RECORD_ERROR
} from "../dataTypes/recordType";

export const createRecord = (record, projectOwner) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("records")
      .add({
        ...record,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        roles: {
          [authorId]: "owner",
          [projectOwner]: "owner"
        },
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: CREATE_RECORD_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: CREATE_RECORD_ERROR }, err);
      });
  };
};

export const deleteRecord = recordId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("records")
      .doc(recordId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_RECORD_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: DELETE_RECORD_ERROR }, err);
      });
  };
};

export const updateRecord = (id, record) => {
  const { name, phone, email, address, website, product, note, rate} = record
  let query = {
    ...(name && {name}),
    ...(phone && {phone}),
    ...(email && {email}),
    ...(address && {address}),
    ...(website && {website}),
    ...(product && {product}),
    ...(note && {note}),
    ...(rate && {rate}),
  }
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("records")
      .doc(id)
      .update(query)
      .then(() => {
        dispatch({ type: UPDATE_RECORD_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: UPDATE_RECORD_ERROR }, err);
      });
  };
};
