import React from 'react'
import RecordSummary from './RecordSummary'
import { Link } from 'react-router-dom'

const RecordList = ({records}) => {
  return (
    <div className="record-list section">
      { records && records.map(record => {
        return (
          <Link to={`/projects/${record.projectId}/records/` + record.id} key={record.id}>
            <RecordSummary record={record} />
          </Link>
        )
      })}  
    </div>
  )
}

export default RecordList
