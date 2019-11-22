import React, { useState } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { Button, Row, Col } from "react-bootstrap";

const UpdateProjectModal = props => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handelUpdate = () => {
    const query = {
      ...(title && { title }),
      ...(content && { content })
    };
    props.updateProject(props.id, query);
    ModalManager.close();
  };
  return (
    <Modal
      style={{ content: { width: "45%" } }}
      onRequestClose={props.onRequestClose}
      effect={Effect.Sign3D}
    >
      <Row>
        <Col className="p-4 mx-2">
          <h3 className="text-center">Sửa bảng</h3>
          <div>
            Bạn đang sửa bảng: <b>{props.title}</b>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={`Nhập tên bảng mới`}
            autoFocus
            onChange={e => setTitle(e.target.value)}
          ></input>
          <input
            type="text"
            className="form-control"
            placeholder={`Nhập mô tả mới`}
            onChange={e => setContent(e.target.value)}
          ></input>
          <div className="text-right mt-4">
            <Button
              size="sm"
              variant="primary"
              className="mx-1"
              onClick={() => handelUpdate()}
            >
              Sửa
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

export default UpdateProjectModal;