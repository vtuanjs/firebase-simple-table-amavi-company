import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { createSelector } from "reselect";
import { firestoreSeclector, authSelector } from "../../store/selector";
import moment from "moment";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { deleteRecord } from "../../store/actions/recordActions";

const MyModal = props => {
  const handelDelete = () => {
    ModalManager.close();
    props.deleteRecord();
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

const RecordDetails = props => {
  const { record, auth } = props;
  const id = props.id;
  if (!auth.uid) return <Redirect to="/signin" />;
  const handleDeleteRecord = recordId => {
    props.deleteRecord(recordId);
    props.history.push(`/projects/${props.match.params.projectId}`);
  };

  const openModal = (recordTitle, recordId) => {
    ModalManager.open(
      <MyModal
        title={recordTitle}
        deleteRecord={() => handleDeleteRecord(recordId)}
        onRequestClose={() => true}
      />
    );
  };

  if (record) {
    // const disabledButton = project.roles[authId] === "owner" ? false : true;
    return (
      <Container>
        <Col className="text-right mt-4">
          <Button
            className="mx-1"
            size="sm"
            variant="danger"
            // disabled={disabledButton}
            onClick={() => openModal(record.title, id)}
          >
            Xoá record
          </Button>
          <Button as={Link} to={`/projects/${record.projectId}`}>
            Quay lại bảng
          </Button>
        </Col>
        <Form className="shadow-lg bg-white rounded p-4 m-4">
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Tên
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Số điện thoại
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.phone} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Email
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Địa chỉ
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.address} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Website
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.website} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Mặt hàng
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.product} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Ghi chú
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control plaintext readOnly defaultValue={record.note} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Đánh giá
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                readOnly
                defaultValue={`${record.rate} sao`}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Người tạo
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                readOnly
                defaultValue={`${record.authorLastName} ${record.authorFirstName}`}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Ngày tạo
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                readOnly
                defaultValue={moment(record.createdAt.toDate()).calendar()}
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading record...</p>
      </div>
    );
  }
};

const recordIdSelector = (_, props) => props.match.params.recordId;

const mapStateToProps = createSelector(
  recordIdSelector,
  authSelector,
  firestoreSeclector,
  (id, auth, firestore) => ({
    record: firestore.data.records && firestore.data.records[id],
    auth,
    id
  })
);

const mapActionToProps = {
  deleteRecord
};

export default compose(
  connect(mapStateToProps, mapActionToProps),
  firestoreConnect(props => [
    {
      collection: "records",
      doc: props.match.params.recordId
    }
  ])
)(RecordDetails);
