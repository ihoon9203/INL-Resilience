import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/tutorial.css';

const TutorialContent = function TutorialContent({ page }) {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <img className="tutorial-img" src={page.image} alt="analysis panel" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div>
            {page.caption}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialContent;
