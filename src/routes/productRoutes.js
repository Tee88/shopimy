import {
  addNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const routes = app => {
  app
    .route('/products')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getProducts)
    .post(addNewProduct);

  app
    .route('/products/:productId')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);
};

export default routes;
