import React, { useState } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { Button, Row, Col } from "react-bootstrap";

const DeleteProjectModal = props => {
  const [inputValue, setInputValue] = useState("");
  const handelDelete = () => {
    if (inputValue === props.title) {
      ModalManager.close();
      props.deleteProject(props.id);
      props.history.push("/");
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

export default DeleteProjectModal;
