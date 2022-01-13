import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const Footer = function FooterFunc() {
  return (
    <section className="footer">
      <hr />
      <Container>
        <Row>
          <Col className="footer-center">© Copyright of University of Utah</Col>
        </Row>
      </Container>
    </section>
  );
};
export default Footer;
