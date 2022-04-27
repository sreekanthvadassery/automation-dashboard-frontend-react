import React from 'react'

import { Container, Navbar, Col } from 'react-bootstrap';

const Footer = () => {

let fullYear = new Date().getFullYear();

  return (
    <Navbar fixed="bottom" bg="dark" varian="dark">
        <Container>
            <Col lg={12} className="text-center text-muted">
                <div>{fullYear}-{fullYear+1}, All Rights Reserved by IBS Software Private Limited</div>
            </Col>
        </Container>
    </Navbar>
  )
}

export default Footer