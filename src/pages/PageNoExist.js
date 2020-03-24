import React from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const PageNoExist = () => (
  <Container>
    <Row>
      <Col className="page-not-exist-container mt-5">
        <h1> 404 </h1>
        <h3> This page does not exist</h3>
        <Link to="/">
          <Button color="info" className="mt-3">
            Home
          </Button>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default PageNoExist;
