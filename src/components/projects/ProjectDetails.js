import React, { useRef } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import moment from "moment";
import CreateRecord from "../records/CreateRecord";
import RecordContainer from "../records/RecordContainer";
import {
  Button,
  OverlayTrigger,
  Popover,
  Container,
  Table,
  Row
} from "react-bootstrap";
import { createSelector } from "reselect";
import { projectSelector } from "../../store/selectors/projectSelector";
import { authSelector } from "../../store/selectors/authSelector";
import { deleteProject } from "../../store/actions/projectActions";

const ProjectDetails = props => {
  const { project, auth } = props;
  const id = props.match.params.projectId;
  const refContainer = useRef();

  const popover = (
    <Popover id="pop" style={{ maxWidth: "none", minWidth: "30%" }}>
      <Popover.Title as="h3">Tạo bản ghi mới</Popover.Title>
      <CreateRecord projectId={id} refContainer={refContainer} />
    </Popover>
  );

  const handleDeleteProject = project => {
    props.deleteProject(project);
    props.history.push("/");
  };

  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    return (
      <Container fluid>
        <Row className="white mt-4 mr-2 ml-2">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>
                  <h4 className="text-center">{project.title}</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i>{project.content}</i>
                </td>
              </tr>
              <tr>
                <td>
                  <tr>
                    <td>
                      Tạo bởi {project.authorLastName} {project.authorFirstName}{" "}
                      - {moment(project.createdAt.toDate()).calendar()}
                    </td>
                  </tr>
                </td>
              </tr>
              <td className="text-center">
                <b>
                  <Button className="mx-1" variant="light" size="sm" onClick={() => handleDeleteProject(project.id)}>
                    Xoá bảng</Button>
                  <Button className="mx-1" variant="light" size="sm">Sửa bảng</Button>
            
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={popover}
                    ref={refContainer}
                    rootClose
                  >
                    <Button className="mx-1" variant="light" size="sm">Thêm dòng mới</Button>
                  </OverlayTrigger>
                </b>
              </td>
            </tbody>
          </Table>
        </Row>
        <Row className="white mr-2 ml-2">
          <RecordContainer projectId={id} />
        </Row>
      </Container>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapActionToProps = {
  deleteProject
};

const mapStateToProps = createSelector(
  projectSelector,
  authSelector,
  (project, auth) => ({
    project: project,
    auth: auth
  })
);

export default withRouter(
  compose(
    connect(mapStateToProps, mapActionToProps),
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
