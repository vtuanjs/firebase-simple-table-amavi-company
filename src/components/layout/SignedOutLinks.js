import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const SignedOutLinks = () => {
  return (
    <Nav>
      <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
      <Nav.Link as={Link} to="/signin">Login</Nav.Link>
    </Nav>
  )
}

export default SignedOutLinks