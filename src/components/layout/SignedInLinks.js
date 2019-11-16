import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <Nav>
      <Nav.Link as={Link} to="/create">New Project</Nav.Link>
      <Nav.Link onClick={props.signOut}>Log Out</Nav.Link>
      <Form inline>
        <Button variant="outline-light" className="pink lighten-1">{props.profile.initials}</Button>
      </Form>
    </Nav>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
