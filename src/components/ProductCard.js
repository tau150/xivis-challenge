import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import './styles/ProductCard.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({
  product, viewStyle, detailsView, push,
}) => {
  const {
    _id, picture, price, stock, name, company, description,
  } = product;

  const [quantityValue, setQuantityValue] = useState('');

  const handleChangeQuantity = (e) => {
    setQuantityValue(e.target.value);
  };
  const history = useHistory();

  const handleClickName = () => {
    history.push(`/product/${_id}/details`);
  };


  return (
    <div className={`card-container ${viewStyle} `}>
      <img src={picture} alt={name} />
      <div className="body-container">
        <div className="info-container">
          <h6 className="mt-3 mb-0">{name}</h6>
          <FontAwesomeIcon className="fa-eye mt-3 ml-3 clickable" icon={faInfoCircle} onClick={() => handleClickName()} />
        </div>
        <div className="custom-card-footer">
          <p>{price}</p>
          <Input value={quantityValue} onChange={handleChangeQuantity} type="number" />
          { stock > 0 ? <Button className="main-button btn-sm">Agregar al carrito</Button> : <Button disabled>Sin stock</Button>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
