import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 

    return (
      <Container>
        <Row>
          <Col className="xs-12 sm-6 md-6">
            <ProjectList projects={projects} />
          </Col>
          <Col className="d-none sm-6 md-6 d-sm-block offset-m1">
            <Notifications notifications={notifications} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 8, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
