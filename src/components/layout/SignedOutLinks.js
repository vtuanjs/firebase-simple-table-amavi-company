import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const SignedOutLinks = () => {
  return (
    <Nav>
      <Nav.Link as={Link} to="/signup">Đăng kí</Nav.Link>
      <Nav.Link as={Link} to="/signin">Đăng nhập</Nav.Link>
    </Nav>
  )
}

export default SignedOutLinks