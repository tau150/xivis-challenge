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
  productsSelector,
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
  productsSelector,
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
