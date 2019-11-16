import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'


const ProjectList = ({projects}) => {
  return (
    <div className="section">
      { projects && projects.map(project => {
        return (
          <Link to={'/projects/' + project.id} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList
