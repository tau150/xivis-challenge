/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';
import './styles/ProductCard.css';
import { setProductToToSeeDetails, setProductsAndStock } from 'store/actions/shop';
import { productsSelector, productsOnCartSelector } from 'store/selectors/shop';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({
  product, viewStyle,
}) => {
  const {
    _id, picture, price, stock, name, description,
  } = product;

  const [quantityValue, setQuantityValue] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => productsSelector(state));
  const productsOnCart = useSelector((state) => productsOnCartSelector(state));


  const handleChangeQuantity = (e) => {
    setQuantityValue(Number(e.target.value));
  };
  const history = useHistory();

  const handleClickName = () => {
    dispatch(setProductToToSeeDetails(product));
    history.push(`/product/${_id}/details`);
  };

  const handleClickAddToCart = () => {
    if (quantityValue > stock) {
      notify.show('No hay stock suficiente', 'error');
      setQuantityValue(1);
      return;
    }
    let updatedProductsOnCart;
    const updatedProducts = allProducts.map((prod) => {
      const updatedProd = prod;
      if (updatedProd._id === _id) {
        updatedProd.stock -= quantityValue;
      }
      return updatedProd;
    });

    if (productsOnCart.length > 0) {
      let existInArray = false;
      updatedProductsOnCart = productsOnCart.map((prod) => {
        const prodCopy = prod;
        if (prodCopy.product._id === product._id) {
          existInArray = true;
          prodCopy.quantity += quantityValue;
        }
        return prodCopy;
      });

      if (!existInArray) {
        updatedProductsOnCart = [...updatedProductsOnCart, { quantity: quantityValue, product }];
      }
    } else {
      updatedProductsOnCart = [{ quantity: quantityValue, product }];
    }
    const isAdding = true;
    dispatch(setProductsAndStock(updatedProductsOnCart, updatedProducts, isAdding));
    setQuantityValue(1);
    notify.show('Agregado al carrito!', 'success');
  };

  return (
    <div className={`card-container ${viewStyle} `}>
      { !isImageLoaded && (
      <div className="img-placeholder">
        <p>Cargando...</p>
      </div>
      ) }
      <img style={!isImageLoaded ? { visibility: 'hidden' } : {}} src={picture} alt={name} onLoad={() => setIsImageLoaded(true)} />

      <div className="body-container">
        <div className="info-container">
          <h6 className="mt-3 mb-0">{name}</h6>
          { viewStyle === 'details' ? (
            <>
              <p className="details-price">{price}</p>
              <p className="main-text">{description}</p>
            </>
          ) : (<FontAwesomeIcon className="fa-eye mt-3 ml-3 clickable" icon={faInfoCircle} onClick={() => handleClickName()} />) }
        </div>
        <div className="custom-card-footer">
          { viewStyle !== 'details' && <p>{price}</p> }
          { stock > 0 ? (
            <>
              <Input placeholder="0" value={quantityValue} min="1" max={stock} onChange={handleChangeQuantity} type="number" />
              <Button className="main-button btn-sm" onClick={handleClickAddToCart}>Agregar al carrito</Button>
            </>
          ) : (<Button className="btn-sm" disabled>Sin stock</Button>)}

        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    picture: PropTypes.string,
    price: PropTypes.string,
    stock: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  viewStyle: PropTypes.string.isRequired,
};

export default ProductCard;
