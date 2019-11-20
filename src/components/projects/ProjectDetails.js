import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import CreateRecord from "../records/CreateRecord";
import RecordContainer from "../records/RecordContainer";
import {
  Button,
  OverlayTrigger,
  Popover,
  Container,
  Table,
  Row,
  Col
} from "react-bootstrap";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { deleteProject } from "../../store/actions/projectActions";

const MyModal = props => {
  const [inputValue, setInputValue] = useState("");
  const handelDelete = () => {
    if (inputValue === props.title) {
      ModalManager.close();
      props.deleteProject();
    }
  };
  return (
    <Modal
      style={{ content: { width: "45%" } }}
      onRequestClose={props.onRequestClose}
      effect={Effect.Sign3D}
    >
      <Row>
        <Col className="p-4 mx-2">
          <h3 className="text-center">Xác nhận xoá</h3>
          <div>
            Bạn có muốn xoá bảng <b>{props.title}</b> không?
          </div>
          <div>Sau khi xoá, dữ liệu không thể khôi phục.</div>
          <div>Nhập lại tên bảng để xác nhận</div>
          <input
            type="text"
            className="form-control"
            placeholder={`Nhập lại tên bảng`}
            onChange={e => setInputValue(e.target.value)}
          ></input>
          <div className="text-right mt-4">
            <Button
              size="sm"
              variant="primary"
              className="mx-1"
              onClick={() => handelDelete()}
            >
              Xoá
            </Button>
            <Button size="sm" className="mx-1" onClick={ModalManager.close}>
              Không
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

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

  const handleDeleteProject = projectId => {
    props.deleteProject(projectId);
    props.history.push("/");
  };

  const openModal = (projectTitle, projectId) => {
    ModalManager.open(
      <MyModal
        title={projectTitle}
        deleteProject={() => handleDeleteProject(projectId)}
        onRequestClose={() => true}
      />
    );
  };

  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
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
                      onClick={() => openModal(project.title, id)}
                    >
                      Xoá bảng
                    </Button>
                    <Button
                      className="mx-1"
                      variant="light"
                      size="sm"
                      disabled={disabledButton}
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

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.projectId;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, mapActionToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)