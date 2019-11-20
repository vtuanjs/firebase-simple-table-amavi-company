import React, { Component } from "react";
import ProjectList from "../projects/ProjectList";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { createSelector } from "reselect";
import { firestoreSeclector, authSelector } from "../../store/selector";

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const handleShowProjectList = () => {
      if (!projects) {
        return <div className="container center">Loading...</div>
      } else
      if (projects.length === 0){
        return <div className="container center">Không tìm thấy bảng nào</div>
      }

      return <ProjectList projects={projects}/>
    };

    const handleShowNotification = () => {
      if (!notifications) {
        return <div className="container center">Loading...</div>
      } else
      if (notifications.length === 0){
        return <div className="container center">Không tìm thấy thông báo nào</div>
      }

      return <Notifications notifications={notifications}/>
    };

    return (
      <Container>
        <Row>
          <Col className="xs-12 sm-6 md-6">
            {handleShowProjectList()}
          </Col>
          <Col className="d-none sm-6 md-6 d-sm-block offset-m1">
            {handleShowNotification()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = createSelector(
  firestoreSeclector,
  authSelector,
  (firestore, auth) => ({
    projects: firestore.ordered.projects,
    auth,
    notifications: firestore.ordered.notifications
  })
);

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 8, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
