import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { createSelector } from 'reselect'
import { projectsSelector } from '../../store/selectors/projectSelector'

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

const authSelector = createSelector(
  state => state.firebase.auth,
  auth => auth
)

const notifySelector = createSelector(
  state => state.firestore.ordered.notifications,
  notifications => notifications
)

const mapStateToProps = createSelector(
  projectsSelector,
  authSelector,
  notifySelector,
  (projects, auth, notifications) => ({
    projects,
    auth,
    notifications
  })
)

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 8, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
