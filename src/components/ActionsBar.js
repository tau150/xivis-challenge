import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setOrder, setCurrentPage } from 'store/actions/shop';
import {
  searchedValueSelector, orderSelector, currentPageSelector, paginationPagesSelector, productsBySearchValueSelector,
} from 'store/selectors/shop';
import {
  FormGroup, Label, Container, Row, Col, Input, Badge,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles/ActionBar.css';

const ActionsBar = ({
  totalResults, viewStyle, setViewStyle, options,
}) => {
  const dispatch = useDispatch();
  const searchedValue = useSelector((state) => searchedValueSelector(state));
  const order = useSelector((state) => orderSelector(state));
  const paginationPages = useSelector((state) => paginationPagesSelector(state));
  const currentPage = useSelector((state) => currentPageSelector(state));
  const filteredProducts = useSelector((state) => productsBySearchValueSelector(state));

  const [searchValue, setSearchValue] = useState('');
  const [orderValue, setOrderValue] = useState(order);


  const history = useHistory();


  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      dispatch(setSearch(searchValue));
      if (history.location.pathname.includes('details')) {
        history.push('/');
      }
    }
  };

  useEffect(() => {
    if (searchedValue) {
      setSearchValue(searchedValue);
    } else {
      setSearchValue('');
    }
  }, [searchedValue]);


  useEffect(() => {
    setOrderValue(order);
  }, [order]);


  const handleOrderChange = (e) => {
    let orderDirection;

    if (e.target.value === 'stock') {
      orderDirection = 'desc';
    }

    if (e.target.value === 'price' || e.target.value === 'index' || e.target.value === 'name') {
      orderDirection = 'asc';
    }


    dispatch(setOrder(e.target.value, orderDirection));
  };

  const handleClickBackButton = () => {
    history.goBack();
  };

  const renderResultsInfo = () => {
    const numbersToShow = filteredProducts.length || totalResults;
    const wordToShow = numbersToShow === 1 ? 'resultado' : 'resultados';
    const finalPhrase = `${numbersToShow} ${wordToShow} ${filteredProducts.length > 0 ? 'para la búsqueda' : ''}`;

    return finalPhrase;
  };


  return (
    <Container className="mt-3">
      <Row>
        { options.includes('search') && (
        <Col sm="2" className="d-flex align-items-start">
          <Input type="text" value={searchValue} onKeyUp={handleSearchChange} onChange={(e) => setSearchValue(e.target.value)} name="search" placeholder="Buscar..." />
          {searchedValue && <FontAwesomeIcon className="mt-2 ml-2 clickable" icon={faTrash} onClick={() => dispatch(setSearch(null))} />}
        </Col>
        )}
        { options.includes('order') && (
        <Col sm="3">
          <FormGroup row>
            <Label for="exampleEmail" sm={4}>Ordenar</Label>
            <Col sm={8}>
              <Input className="custom-select" type="select" name="order" value={orderValue} onChange={handleOrderChange}>
                <option value="index">Más relevantes</option>
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="stock">Stock</option>
              </Input>
            </Col>
          </FormGroup>
        </Col>
        )}

        { options.includes('views') && (
        <Col sm="2" className="d-flex align-items-center justify-content-center">
          <FontAwesomeIcon onClick={() => setViewStyle('grid')} className={`fa mb-3 mx-2 clickable ${viewStyle === 'grid' ? 'icon-disabled' : 'icon-enabled'}`} icon={faTh} />
          <FontAwesomeIcon onClick={() => setViewStyle('list')} className={`fa mb-3 mx-2 clickable ${viewStyle === 'list' ? 'icon-disabled' : 'icon-enabled'}`} icon={faList} />
        </Col>
        )}


        { options.includes('results') && (
        <Col sm="2" className="d-flex align-items-center justify-content-center ml-auto">
          <p>
            { renderResultsInfo()}
          </p>
        </Col>
        )}

        { options.includes('back') && (
        <Col sm="2" className="d-flex align-items-center justify-content-center ml-auto">
          <button type="button" className="btn-empty" onClick={handleClickBackButton}> &lt;&lt; Volver </button>
        </Col>
        )}


        { options.includes('pagination') && filteredProducts.length === 0 && (
        <Col sm="2" className="d-flex align-items-start">
          { paginationPages.map((page) => (
            <Badge key={page} className="clickable pagination-page" color={`${currentPage === page ? 'dark' : ''}`} onClick={() => dispatch(setCurrentPage(page))}>
              {page}
            </Badge>
          ))}
        </Col>
        )}

      </Row>
    </Container>

  );
};


ActionsBar.defaultProps = {
  totalResults: null,
  viewStyle: null,
  setViewStyle: null,
};

ActionsBar.propTypes = {
  totalResults: PropTypes.number,
  viewStyle: PropTypes.string,
  setViewStyle: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ActionsBar;
