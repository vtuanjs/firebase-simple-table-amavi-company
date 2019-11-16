import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, withRouter } from 'react-router-dom'
import moment from 'moment'

const RecordDetails = (props) => {
  const { record, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />
  if (record) {
    return (
      <div className="container section record-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{record.title}</span>
            <p>{record.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {record.authorFirstName} {record.authorLastName}</div>
            <div>{moment(record.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading record...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const myRecords = state.firestore.ordered.myRecords
  // debugger
  const record = myRecords ? myRecords[0] : null
  return {
    record: record,
    auth: state.firebase.auth,

  }
}

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const recordId = props.match.params.recordId

    return [{
      collection: 'records',
      doc: recordId,
      storeAs: 'myRecords'
    }]
  })
)(RecordDetails))
