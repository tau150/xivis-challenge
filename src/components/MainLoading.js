import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './styles/MainLoading.css';

const MainLoading = () => (
  <div className="main-loading">
    <FontAwesomeIcon size="3x" className="fa-spin" icon={faSpinner} rotation={270} />
    <p>Cargando...</p>
  </div>
);

export default MainLoading;
