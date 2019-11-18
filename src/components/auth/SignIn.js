import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect, Link } from "react-router-dom";
import { Form, Button, Container, Col } from "react-bootstrap";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <Container as={Col} md="5" sm="12">
        <Form className="shadow-lg bg-white rounded p-4 m-4" onSubmit={this.handleSubmit}>
          <h3 className="center">ĐĂNG NHẬP</h3>

          <Form.Group controlId="formBasicEmail" className="input-field">
            <Form.Label htmlFor="email">Nhập email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="input-field">
            <Form.Label htmlFor="password">Nhập password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form inline></Form>
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
            <Form>
              <Form.Label className="mt-4">
              Chưa có tải khoản? <Link to="/signup">Đăng kí ngay!</Link>
              </Form.Label>
            </Form>
            <Form className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </Form>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
