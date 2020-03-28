/* eslint-disable no-underscore-dangle */
import { createSelector } from 'reselect';
import _ from 'lodash';

export const productsSelector = (state) => state.shop.products;
export const errorMessageSelector = (state) => state.shop.errorMessage;
export const loadingSelector = (state) => state.shop.isLoading;
export const productWithDetailsSelector = (state) => state.shop.productWitDetails;
export const productsOnCartSelector = (state) => state.shop.productsOnCart;
export const searchedValueSelector = (state) => state.shop.searchValue;
export const orderSelector = (state) => state.shop.order;
export const numberOfPagesSelector = (state) => state.shop.numberOfPages;
export const currentPageSelector = (state) => state.shop.currentPage;

export const productsWithCartComparationSelector = createSelector(
  productsSelector,
  productsOnCartSelector,
  (rawProducts, productsOnCart) => {
    const productsWithModifiedStock = _.intersectionBy(productsOnCart, rawProducts, '_id');

    if (productsWithModifiedStock.length > 0) {
      const productsOnCartIds = productsWithModifiedStock.map((product) => product._id);
      return rawProducts.map((product) => {
        if (productsOnCartIds.includes(product._id)) {
          const toReturn = productsWithModifiedStock.find((prod) => prod._id === product._id);
          return toReturn.product;
        }
        return product;
      });
    }
    return rawProducts;
  },
);

export const paginationPagesSelector = createSelector(
  numberOfPagesSelector,
  (pages) => {
    const pagination = [];
    for (let i = 1; i <= pages; i++) {
      pagination.push(i);
    }
    return pagination;
  },
);
const orderDirection = (state) => state.shop.orderDirection;

export const productsOrderBySelector = createSelector(
  productsWithCartComparationSelector,
  orderSelector,
  orderDirection,
  currentPageSelector,
  (products, order, direction, currentPage) => {
    const finalPosition = currentPage * 9;
    const startPosition = finalPosition - 9;
    const orderedProducts = _.orderBy(products, [order], [direction]);
    const paginatedProducts = orderedProducts.slice(startPosition, finalPosition);
    return paginatedProducts;
  },
);

const allProductsOrdered = createSelector(
  productsWithCartComparationSelector,
  orderSelector,
  orderDirection,
  currentPageSelector,
  (products, order, direction) => _.orderBy(products, [order], [direction]),
);


export const productsBySearchValueSelector = createSelector(
  allProductsOrdered,
  searchedValueSelector,
  (products, searchValue) => products.filter((product) => product.name.toLowerCase().includes(searchValue && searchValue.toLowerCase())),
);
