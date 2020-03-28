/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from 'store/actions/shop';
import {
  productsWithCartComparationSelector, loadingSelector, productsBySearchValueSelector, productsOrderBySelector, productsSelector,
} from 'store/selectors/shop';
import ActionsBar from 'components/ActionsBar';
import MainLoading from 'components/MainLoading';
import ProductCard from 'components/ProductCard';
import './styles/Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => productsWithCartComparationSelector(state));
  const isLoading = useSelector((state) => loadingSelector(state));
  const filteredProducts = useSelector((state) => productsBySearchValueSelector(state));
  const orderedProducts = useSelector((state) => productsOrderBySelector(state));
  const [viewStyle, setViewStyle] = useState('grid');

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);


  if (isLoading && products.length === 0) return <MainLoading />;

  return (
    <div className="mt-5">
      <ActionsBar options={['search', 'order', 'views', 'results', 'pagination']} totalResults={products.length} viewStyle={viewStyle} setViewStyle={setViewStyle} />
      <Container>
        <Row>
          <Col className="pb-5">
            <div className={viewStyle === 'grid' ? 'grid-container' : 'list-container'}>
              { filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product._id} product={product} viewStyle={viewStyle} />)) : orderedProducts.map((product) => <ProductCard key={product._id} product={product} viewStyle={viewStyle} />) }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default Products;
