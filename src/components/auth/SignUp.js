import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Form, Button, Container, Col } from 'react-bootstrap'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <Container as={Col} md="5" sm="12">
        <Form className="shadow-lg bg-white rounded p-4 m-4" onSubmit={this.handleSubmit}>
          <h3 className="center">ĐĂNG KÍ</h3>

          <Form.Group controlId="formBasicEmail" className="input-field">
            <Form.Label htmlFor="email">Nhập Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="input-field">
            <Form.Label htmlFor="password">Nhập Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName" className="input-field">
            <Form.Label htmlFor="lastName">Nhập Họ</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFirstname" className="input-field">
            <Form.Label htmlFor="firstName">Nhập Tên</Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form inline></Form>
            <Button variant="primary" type="submit">
              Đăng kí
            </Button>
            <Form className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </Form>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
