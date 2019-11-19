import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { recordSelector } from "../../store/selectors/recordSelector";
import { authSelector } from "../../store/selectors/authSelector";
import { createSelector } from "reselect";
import moment from "moment";

const RecordDetails = props => {
  const { record, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (record) {
    return (
      <Container>
        <Col className="text-right mt-4">
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

const mapStateToProps = createSelector(
  recordSelector,
  authSelector,
  (record, auth) => ({ record, auth })
);

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      const recordId = props.match.params.recordId;

      return [
        {
          collection: "records",
          doc: recordId,
          storeAs: "filterRecords"
        }
      ];
    })
  )(RecordDetails)
);
