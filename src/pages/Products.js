import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, toggleLoading } from 'store/actions/shop';
import { productsSelector, loadingSelector } from 'store/selectors/shop';
import ActionsBar from 'components/ActionsBar';
import MainLoading from 'components/MainLoading';
import ProductCard from 'components/ProductCard';
import './styles/Products.css';

const Products = ({}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => productsSelector(state));

  const isLoading = useSelector((state) => loadingSelector(state));

  const [viewStyle, setViewStyle] = useState('grid');


  useEffect(() => {
    if (!products) {
      dispatch(getAllProducts());
    }
  }, []);


  if (isLoading) return <MainLoading />;

  return (
    <div className="mt-5">
      <ActionsBar totalResults={products.length} viewStyle={viewStyle} setViewStyle={setViewStyle} />
      <Container>
        <Row>
          <Col className="pb-5">
            <div className={viewStyle === 'grid' ? 'grid-container' : 'list-container'}>
              { products.map((product) => <ProductCard product={product} viewStyle={viewStyle} />) }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default Products;
