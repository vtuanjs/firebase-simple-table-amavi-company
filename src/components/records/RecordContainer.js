import React from "react";
import RecordList from "../records/RecordList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const RecordContainer = props => {
  const { records, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <Container>
      <Row>
        <RecordList records={records} />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const myRecords = state.firestore.ordered["myRecords"];
  return {
    records: myRecords,
    auth: state.firebase.auth
  };
};

export default withRouter(
  compose(
    firestoreConnect(props => {
      const projectId = props.match.params.projectId;

      return [
        {
          collection: "records",
          where: [["projectId", "==", projectId]],
          storeAs: "myRecords"
        }
      ];
    }),
    connect(mapStateToProps)
  )(RecordContainer)
);
