/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productsOnCartSelector, productsSelector, currentPageSelector, numberOfPagesSelector,
} from 'store/selectors/shop';
import { Link, useHistory } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import {
  Container, Row, Col, Card, CardBody, CardText,
  Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { setProductsAndStock, finalizePurchase } from 'store/actions/shop';
import ActionBar from 'components/ActionsBar';
import './styles/Cart.css';


const Cart = () => {
  const productsOnCart = useSelector((state) => productsOnCartSelector(state));
  const allProducts = useSelector((state) => productsSelector(state));
  const currentPage = useSelector((state) => currentPageSelector(state));
  const numberOfPages = useSelector((state) => numberOfPagesSelector(state));

  const [modal, setModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleClickDeleteFromCart = (product, deleteAll) => {
    const productCopy = { ...product };
    let updatedProductsOnCart;


    const updatedProducts = allProducts.map((prod) => {
      const updatedProd = prod;
      if (updatedProd._id === product.product._id) {
        if (deleteAll) {
          updatedProd.stock += productCopy.quantity;
        } else {
          updatedProd.stock += 1;
        }
      }
      return updatedProd;
    });

    if (!deleteAll) {
      productCopy.quantity -= 1;

      updatedProductsOnCart = productsOnCart.map((prod) => {
        const prodCopy = prod;
        if (prodCopy.product._id === product.product._id) {
          prodCopy.quantity -= 1;
        }

        return prodCopy;
      });
    } else {
      updatedProductsOnCart = productsOnCart.filter((prod) => prod.product._id !== product.product._id);
    }

    dispatch(setProductsAndStock(updatedProductsOnCart, updatedProducts, numberOfPages, currentPage));
  };

  let total = 0;
  const calculateFinalPricePerProduct = (product) => {
    const value = parseFloat(product.product.price.substring(1).replace(',', ''));
    const result = value.toFixed(2) * Number(product.quantity);
    total += result;
    return `$${result.toFixed(2)}`;
  };

  const handleClickBuyProducts = () => {
    dispatch(finalizePurchase());
    notify.show('Compra realizada con éxito', 'success');
    history.push('/');
  };

  const renderProductsResume = (product) => (
    <Card>
      <CardBody className="cart-product-card-body">
        <img className="rounded img-fluid" src={product.product.picture} alt="" />
        <div className="info-container">
          <h6>{product.product.name}</h6>
          <p className="main-text">{product.product.description}</p>
          <p>
            <strong> Cantidad: </strong>
            {product.quantity}
          </p>
          <p>
            <strong> Precio unitario: </strong>
            {product.product.price}
          </p>
          <hr className="separator" />
          <p>
            <strong> Precio Total: </strong>
            {calculateFinalPricePerProduct(product)}
          </p>
        </div>
        <div className="actions">
          { product.quantity > 1 && <Badge className="clickable" color="dark" onClick={() => handleClickDeleteFromCart(product, false)}>- 1</Badge> }
          <Badge className="clickable" color="dark" onClick={() => handleClickDeleteFromCart(product, true)}>Eliminar</Badge>
        </div>
      </CardBody>
    </Card>
  );
  return (
    <>
      { productsOnCart.length > 0 && <ActionBar options={['back']} />}
      {productsOnCart.length === 0 && (
      <Card>
        <CardBody>
          <CardText className="py-5">No hay artículos en el carrito </CardText>
          <Link to="/">
            <Button color="info">
              Home
            </Button>
          </Link>
        </CardBody>
      </Card>
      ) }
      <Container>
        <Row>

          <Col className="mt-5">
            { productsOnCart.map((product) => renderProductsResume(product)) }
            { productsOnCart.length > 0 && (
            <Card>
              <CardBody className="cart-product-card-body d-flex align-item-center">
                <Button className="btn btn-sm main-button" onClick={toggle}> Finalizar compra </Button>
                <p className="ml-auto total-price m-0">
                  Total: $
                  {total.toFixed(2)}
                </p>

              </CardBody>
            </Card>
            ) }
          </Col>
        </Row>
      </Container>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Finalizar compra</ModalHeader>
          <ModalBody>
            Seguro desea realizar la compra ?
          </ModalBody>
          <ModalFooter>
            <Button className="bttn-sm main-button" onClick={handleClickBuyProducts}>Aceptar</Button>
            <Button className="bttn-sm" color="secondary" onClick={toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
export default Cart;
