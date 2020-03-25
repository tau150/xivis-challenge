import React from 'react';
import { useSelector } from 'react-redux';
import { productWithDetailsSelector } from 'store/selectors/shop';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from 'components/ProductCard';
import ActionBar from 'components/ActionsBar';


const ProductDetails = () => {
  const productWithDetails = useSelector((state) => productWithDetailsSelector(state));

  return (
    <>
      <ActionBar options={['search', 'back']} />
      <Container className="pb-5">
        <Row>
          <Col>
            <ProductCard product={productWithDetails} viewStyle="details" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
