import React, { useRef } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import CreateRecord from "../records/CreateRecord";
import RecordContainer from "../records/RecordContainer";
import { createSelector } from "reselect";
import { firestoreSeclector, authSelector } from "../../store/selector";
import {
  Button,
  OverlayTrigger,
  Popover,
  Container,
  Table,
  Row
} from "react-bootstrap";
import { ModalManager } from "react-dynamic-modal";
import DeleteProjectModal from "./DeleteProjectModal";
import UpdateProjectModal from "./UpdateProjectModal"
import { deleteProject, updateProject } from "../../store/actions/projectActions";

const ProjectDetails = props => {
  const { project, auth } = props;
  const id = props.match.params.projectId;
  const refContainer = useRef();
  const authId = auth.uid;

  const popover = (
    <Popover id="pop" style={{ maxWidth: "none", minWidth: "30%" }}>
      <Popover.Title as="h3">Tạo bản ghi mới</Popover.Title>
      <CreateRecord projectId={id} refContainer={refContainer} />
    </Popover>
  );

  const openDeleteProjectModal = ({ title, id, deleteProject, history }) => {
    ModalManager.open(
      <DeleteProjectModal
        title={title}
        id={id}
        deleteProject={deleteProject}
        history={history}
        onRequestClose={() => true}
      />
    );
  };

  const openUpdateProjectModal = ({ id, updateProject }) => {
    ModalManager.open(
      <UpdateProjectModal
        id={id}
        updateProject={updateProject}
        onRequestClose={() => true}
      />
    );
  };

  if (!isLoaded(project)) {
    return <div className="text-center p-2">Loading...</div>;
  }

  // Show message if there are no todos
  if (isEmpty(project)) {
    return (
      <div className="text-center p-2">
        Bạn không phải là thành viên của nhóm này, nhấn vào đây để yêu cầu quyền
        truy cập
      </div>
    );
  }

  if (!authId) return <Redirect to="/signin" />;
  if (project) {
    // if (!project.roles.hasOwnProperty(authId)) {
    //   return (
    //     <div className="text-center p-2">
    //       Bạn không phải là thành viên của nhóm này, nhấn vào đây để yêu cầu
    //       quyền truy cập
    //     </div>
    //   );
    // }
    const disabledButton = project.roles[authId] === "owner" ? false : true;
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
                  Tạo bởi {project.authorLastName} {project.authorFirstName} -{" "}
                  {moment(project.createdAt.toDate()).calendar()}
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <b>
                    <Button
                      className="mx-1"
                      variant="light"
                      size="sm"
                      disabled={disabledButton}
                      onClick={() =>
                        openDeleteProjectModal({
                          title: project.title,
                          id,
                          deleteProject: props.deleteProject,
                          history: props.history
                        })
                      }
                    >
                      Xoá bảng
                    </Button>
                    <Button
                      className="mx-1"
                      variant="light"
                      size="sm"
                      disabled={disabledButton}
                      onClick={() =>
                        openUpdateProjectModal({
                          id,
                          updateProject: props.updateProject,
                        })
                      }
                    >
                      Sửa bảng
                    </Button>

                    <OverlayTrigger
                      trigger="click"
                      key="bottom"
                      placement="bottom"
                      overlay={popover}
                      ref={refContainer}
                      rootClose
                    >
                      <Button className="mx-1" variant="light" size="sm">
                        Thêm dòng mới
                      </Button>
                    </OverlayTrigger>
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row className="white mr-2 ml-2">
          <RecordContainer projectId={project.uid} />
        </Row>
      </Container>
    );
  }
};

const projectIdSelector = (_, props) => props.match.params.projectId;

const mapStateToProps = createSelector(
  projectIdSelector,
  firestoreSeclector,
  authSelector,
  (id, firestore, auth) => ({
    project: firestore.data.projects && firestore.data.projects[id],
    auth
  })
);

const mapActionToProps = {
  deleteProject, updateProject
};

export default compose(
  connect(mapStateToProps, mapActionToProps),
  firestoreConnect(props => [
    {
      collection: "projects",
      doc: props.match.params.projectId
    }
  ])
)(ProjectDetails);
