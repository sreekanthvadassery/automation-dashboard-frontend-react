import React from 'react'

import {Navbar,Container,Nav} from 'react-bootstrap';
import {BsBook} from 'react-icons/bs'

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">
                <BsBook/> Automation Dashboard
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="save-project">Add Project</Nav.Link>
                <Nav.Link href="project-list">Project List</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavigationBar