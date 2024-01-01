import React, { useState } from 'react';
import { Navbar, Nav, Container, OverlayTrigger, Image, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Popover from 'react-bootstrap/Popover';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Redux/authSlice';

const NavbarMain = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const logout = () => {
    dispatch(setUser({}));
    navigate('/');
  };

  const popoverNew = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className=''>
          <Button onClick={() => navigate('/editProfile')}>Profile</Button>
        </div>
        <div className=''>
          <Button onClick={() => navigate('/editProfile')}> Edit Profile</Button>
        </div>
        <div className=''>
          <Button onClick={logout}> Logout</Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to='/home'>Fast News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link to='/home'>Home</Nav.Link>
            {/* <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          show={showPopover}
          onToggle={togglePopover}
          overlay={popoverNew}
        >
          <div className="ml-2 cursor-pointer">
            <Image
              height={40}
              width={40}
              src="https://picsum.photos/200/300"
              roundedCircle
            />
          </div>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
