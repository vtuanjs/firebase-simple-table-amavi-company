import React, { useRef } from "react";
import {
  Nav,
  Button,
  Form,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import CreateProject from '../projects/CreateProject'

const SignedInLinks = props => {
  const refContainer = useRef()
  const popover = (
    <Popover id={`popover-positioned-left`}>
      <Popover.Title as="h3">Tạo bảng mới</Popover.Title>
      <CreateProject refContainer={refContainer}/>
    </Popover>
  );

  return (
    <Nav>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        overlay={popover}
        rootClose
        ref={refContainer}
      >
        <Nav.Link active variant="secondary"><span className="border p-2">Tạo bảng mới</span></Nav.Link>
      </OverlayTrigger>

      <Nav.Link onClick={props.signOut}>Đăng xuất</Nav.Link>
      <Form inline>
        <Button variant="outline-light" className="pink lighten-1">
          {props.profile.initials}
        </Button>
      </Form>
    </Nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
