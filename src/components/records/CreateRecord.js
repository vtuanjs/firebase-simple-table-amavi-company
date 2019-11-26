import React, { Component } from "react";
import { connect } from "react-redux";
import { createRecord } from "../../store/actions/recordActions";
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Col } from "react-bootstrap";
import { createSelector } from "reselect";
import { authSelector } from "../../store/selector";

class CreateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name") || "",
      phone: localStorage.getItem("phone") || "",
      email: localStorage.getItem("email") || "",
      address: localStorage.getItem("address") || "",
      website: localStorage.getItem("website") || "",
      product: localStorage.getItem("product") || "",
      note: localStorage.getItem("note") || "",
      rate: 5,
      projectId: this.props.projectId,
    };
  }

  clearRecordStorage = () => {
    const recordFields = [
      "name",
      "phone",
      "email",
      "address",
      "website",
      "product",
      "note"
    ];
    
    recordFields.forEach(field => {
      localStorage.removeItem(field);
    })
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    localStorage.setItem(e.target.id, this.state[e.target.id]);
  };

  handleClearFormData = () => {
    this.clearRecordStorage();
    this.setState({
      name: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      product: "",
      note: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRecord(this.state, this.props.projectOwner);
    this.clearRecordStorage();
    this.props.refContainer.current.hide();
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" sm="12">
              <Form.Control
                placeholder="Nhập tên"
                type="text"
                id="name"
                onChange={this.handleChange}
                required
                autoComplete="off"
                value={this.state.name}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" sm="12">
              <Form.Control
                placeholder="Nhập số điện thoại"
                type="text"
                id="phone"
                onChange={this.handleChange}
                required
                autoComplete="off"
                value={this.state.phone}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Control
              type="text"
              id="address"
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="Nhập địa chỉ"
              value={this.state.address}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md="6" sm="12">
              <Form.Control
                type="email"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
                placeholder="Nhập email"
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" sm="12">
              <Form.Control
                type="text"
                id="website"
                onChange={this.handleChange}
                autoComplete="off"
                placeholder="Nhập website"
                value={this.state.website}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Control
              type="text"
              id="product"
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="Nhập mặt hàng cung cấp"
              value={this.state.product}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md="8">
              <Form.Control
                type="text"
                id="note"
                onChange={this.handleChange}
                autoComplete="off"
                placeholder="Nhập ghi chú"
                value={this.state.note}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label htmlFor="rate">Chấm điểm</Form.Label>
              <Form.Control
                as="select"
                type="number"
                id="rate"
                onChange={this.handleChange}
              >
                <option disabled>Chọn...</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Button variant="primary" type="submit">
              Tạo mới
            </Button>
            <span className="p-2"></span>
            <Button
              variant="primary"
              onClick={() => this.props.refContainer.current.hide()}
            >
              Đóng tạm
            </Button>
            <span className="p-2"></span>
            <Button
              variant="primary"
              onClick={() => this.handleClearFormData()}
            >
              Xoá hết
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createSelector(authSelector, auth => ({ auth }));

const mapActionToProps = {
  createRecord
}

export default connect(mapStateToProps, mapActionToProps)(CreateRecord);
