import React from 'react';
import { Typography } from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/tutorial.css';

const TutorialContent = function TutorialContent({ page }) {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <img className="tutorial-img" src={page.image} alt="tutorial images" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Typography variant="h6">
            {page.caption}
          </Typography>
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialContent;
