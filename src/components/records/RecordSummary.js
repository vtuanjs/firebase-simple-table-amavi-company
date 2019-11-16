import React from 'react'
import moment from 'moment'

const RecordSummary = ({record}) => {
  return (
    <div className="card z-depth-0 record-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{record.title}</span>
        <p>Posted by {record.authorFirstName} {record.authorLastName}</p>
        <p className="grey-text">{moment(record.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default RecordSummary
