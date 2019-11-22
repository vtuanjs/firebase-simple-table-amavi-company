import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { createSelector } from "reselect";
import { firestoreSeclector, authSelector } from "../../store/selector";
import moment from "moment";
import { ModalManager } from "react-dynamic-modal";
import { updateRecord, deleteRecord } from "../../store/actions/recordActions";
import DeleteRecordModal from "./DeleteRecord";

const RecordDetails = props => {
  const { record, auth } = props;
  const id = props.id;
  const projectId = props.match.params.projectId;

  if (!auth.uid) return <Redirect to="/signin" />;

  const [isInputReadOnly, setIsInputReadOnly] = useState(true);
  const refContainer = useRef();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    product: "",
    note: "",
    rate: ""
  });

  const setAllowWriteInput = () => {
    setIsInputReadOnly(false);
    refContainer.current.focus();
  };

  const handleChangeForm = e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleUpdateRecord = () => {
    props.updateRecord(id, form);
    setIsInputReadOnly(true);
  };
  const openDeleteRecordModal = () => {
    ModalManager.open(
      <DeleteRecordModal
        id={id}
        projectId={projectId}
        deleteRecord={props.deleteRecord}
        history={props.history}
        onRequestClose={() => true}
      />
    );
  };

  if (record) {
    const disabledButton = record.roles[auth.uid] === "owner" ? false : true;
    return (
      <Container>
        <Col className="text-right mt-4">
          {!isInputReadOnly && (
            <span>
              <Button
                className="mx-1"
                size="sm"
                variant="success"
                onClick={handleUpdateRecord}
              >
                Xác nhận
              </Button>
              <Button
                className="mx-1"
                size="sm"
                variant="success"
                onClick={() => setIsInputReadOnly(true)}
              >
                Huỷ bỏ
              </Button>
            </span>
          )}
          {isInputReadOnly && (
            <span>
              <Button
                className="mx-1"
                size="sm"
                variant="success"
                disabled={disabledButton}
                onClick={() => setAllowWriteInput()}
              >
                Sửa record
              </Button>
              <Button
                className="mx-1"
                size="sm"
                variant="danger"
                disabled={disabledButton || !isInputReadOnly}
                onClick={openDeleteRecordModal}
              >
                Xoá record
              </Button>
            </span>
          )}
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
              <Form.Control
                plaintext
                id="name"
                readOnly={isInputReadOnly}
                defaultValue={record.name}
                onChange={handleChangeForm}
                ref={refContainer}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Số điện thoại
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="phone"
                readOnly={isInputReadOnly}
                defaultValue={record.phone}
                onChange={handleChangeForm}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Email
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="email"
                readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={record.email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Địa chỉ
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="address"
                readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={record.address}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Website
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="website"
                readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={record.website}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Mặt hàng
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="product"
                readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={record.product}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Ghi chú
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                plaintext
                id="note"
                readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={record.note}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column lg="2" md="3">
              Đánh giá
            </Form.Label>
            <Col lg="10" md="9">
              <Form.Control
                id="rate"
                as="select"
                type="number"
                disabled={isInputReadOnly}
                // readOnly={isInputReadOnly}
                onChange={handleChangeForm}
                defaultValue={`${record.rate}`}
              >
                <option disabled>Chọn...</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Control>
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
  updateRecord,
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
