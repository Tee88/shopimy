import {
  addNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

import { validateBody, schemas } from './routeHelpers';

const routes = app => {
  app
    .route('/products')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getProducts)
    .post(validateBody(schemas.productSchema), addNewProduct);

  app
    .route('/products/:productId')
    .get(getProductById)
    .put(validateBody(schemas.productSchema), updateProduct)
    .delete(deleteProduct);
};

export default routes;
