import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, withRouter } from 'react-router-dom'
import moment from 'moment'
import CreateRecord from '../records/CreateRecord'
import RecordContainer from '../records/RecordContainer'

const ProjectDetails = (props) => {
  const { project, auth } = props;
  const id = props.match.params.projectId;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
          <div>
            <RecordContainer projectId={id} />
          </div>
          <CreateRecord projectId={id}/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  const projectDetails = state.firestore.ordered.projectDetails;
  const project = projectDetails ? projectDetails[0] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{
      collection: 'projects',
      doc: props.match.params.projectId,
      storeAs: 'projectDetails'
    }]
  })
)(ProjectDetails))
