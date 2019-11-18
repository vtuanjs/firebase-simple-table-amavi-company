import React, { useRef } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import moment from "moment";
import CreateRecord from "../records/CreateRecord";
import RecordContainer from "../records/RecordContainer";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { createSelector } from "reselect";
import { projectSelector } from '../../store/selectors/projectSelector'
import { authSelector } from '../../store/selectors/authSelector'

const ProjectDetails = props => {
  const { project, auth } = props;
  const id = props.match.params.projectId;
  const refContainer = useRef();

  const popover = (
    <Popover id="pop" style={{maxWidth: 'none', minWidth: '30%'}}>
      <Popover.Title as="h3">Tạo bản ghi mới</Popover.Title>
      <CreateRecord projectId={id} refContainer={refContainer} />
    </Popover>
  );

  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Tạo bởi {project.authorLastName} {project.authorFirstName}
            </div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
          <div>
            <RecordContainer projectId={id} />
          </div>
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={popover}
            ref={refContainer}
            rootClose
          >
            <Button>Tạo bản ghi mới</Button>
          </OverlayTrigger>
        </div>
        <div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = createSelector(
  projectSelector,
  authSelector,
  (project, auth) => ({
    project: project,
    auth: auth
  })
)

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      return [
        {
          collection: "projects",
          doc: props.match.params.projectId,
          storeAs: "filterProjects"
        }
      ];
    })
  )(ProjectDetails)
);
