import React from 'react'

import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap';
import {BsBook} from 'react-icons/bs'

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand href="/">
                <BsBook/> Automation Dashboard
            </Navbar.Brand>

            <Nav className="me-auto" bg="dark" variant="dark">
                <NavDropdown title="Project" id="navbarScrollingDropdown" menuVariant="dark">
                    <NavDropdown.Item href="/save-project">Add Project</NavDropdown.Item>
                    <NavDropdown.Item href="/project-list">Project List</NavDropdown.Item>
                    
                    <NavDropdown.Item href="/form-example">Form Example</NavDropdown.Item>
                    <NavDropdown.Item href="/delete-confirm-example">Delete Confirm Example</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavigationBar