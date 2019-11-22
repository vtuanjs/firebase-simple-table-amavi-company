import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { createSelector } from "reselect";
import { authSelector } from "../../store/selector";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.refContainer.current.hide();
  };
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <Container fluid>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="input-field first">
            <Form.Label htmlFor="title">Nhập tiêu đề bảng</Form.Label>
            <Form.Control
              type="text"
              id="title"
              autoFocus
              onChange={this.handleChange}
              required
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="input-field last">
            <Form.Label htmlFor="content">Nhập mô tả</Form.Label>
            <Form.Control
              type="text"
              id="content"
              onChange={this.handleChange}
              required
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit">
              Tạo bảng
            </Button>
            <span className="p-2"></span>
            <Button onClick={() => this.props.refContainer.current.hide()}>
              Đóng
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createSelector(authSelector, auth => ({ auth }));

const mapActionToProps = {
  createProject
};

export default connect(mapStateToProps, mapActionToProps)(CreateProject);
