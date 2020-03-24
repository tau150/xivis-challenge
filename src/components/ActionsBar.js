import React, { useState } from 'react';
import {
  Button, Form, InputGroup, InputGroupAddon, FormGroup, Label, Container, Row, Col, Input, FormText,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';


const ActionsBar = ({ totalResults, viewStyle, setViewStyle }) => {
  const [searchValue, setSearchValue] = useState('');
  const [orderValue, setOrderValue] = useState('');

  const handleSearchChange = (e) => {
    console.log(e.target.value);
  };

  const handleOrderChange = (e) => {
    console.log(e.target.value);
  };


  return (
    <Container className="mt-3">
      <Row>
        <Col sm="2">
          <Input type="text" value={searchValue} onChange={handleSearchChange} name="search" placeholder="Buscar..." />
        </Col>
        <Col sm="3">
          <FormGroup row>
            <Label for="exampleEmail" sm={4}>Ordenar</Label>
            <Col sm={8}>
              <Input className="custom-select" type="select" name="order" value={orderValue} onChange={handleOrderChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </Col>
          </FormGroup>
        </Col>
        <Col sm="2" className="d-flex align-items-center justify-content-center">
          <FontAwesomeIcon onClick={() => setViewStyle('grid')} className={`fa mb-3 mx-2 clickable ${viewStyle === 'grid' ? 'icon-disabled' : 'icon-enabled'}`} icon={faTh} />
          <FontAwesomeIcon onClick={() => setViewStyle('list')} className={`fa mb-3 mx-2 clickable ${viewStyle === 'list' ? 'icon-disabled' : 'icon-enabled'}`} icon={faList} />
        </Col>
        <Col sm="2" className="d-flex align-items-center justify-content-center ml-auto">
          <p clasName="m-0">
            {totalResults}
            {' '}
            {' '}
            resultados
          </p>
        </Col>
      </Row>
    </Container>

  );
};

ActionsBar.Loading = () => (
  <Container className="mt-3">
    <Row>
      <Col sm="2" className="loading-col-2" />
      <Col sm="3" className="loading-col" />
      <Col sm="2" className="loading-col" />
      <Col sm="2" className="loading-col" />
    </Row>
  </Container>
);
export default ActionsBar;
