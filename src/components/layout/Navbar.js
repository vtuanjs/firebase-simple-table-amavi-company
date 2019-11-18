import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Header = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">AMAVI Table</Navbar.Brand>
      <Nav className="ml-auto">
        {links}
      </Nav>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Header)
