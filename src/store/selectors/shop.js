import { createSelector } from 'reselect';
import _ from 'lodash';

export const productsSelector = (state) => state.shop.products;
export const errorMessageSelector = (state) => state.shop.errorMessage;
export const loadingSelector = (state) => state.shop.isLoading;
export const productWithDetailsSelector = (state) => state.shop.productWitDetails;
export const productsOnCartSelector = (state) => state.shop.productsOnCart;
export const searchedValueSelector = (state) => state.shop.searchValue;
export const orderSelector = (state) => state.shop.order;
const orderDirection = (state) => state.shop.orderDirection;

export const productsOrderBySelector = createSelector(
  productsSelector,
  orderSelector,
  orderDirection,
  (products, order, direction) => _.orderBy(products, [order], [direction]),
);

export const productsBySearchValueSelector = createSelector(
  productsOrderBySelector,
  searchedValueSelector,
  (products, searchValue) => products.filter((product) => product.name.toLowerCase().includes(searchValue && searchValue.toLowerCase())),
);
