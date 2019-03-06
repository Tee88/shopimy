import {
  addNewOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController';

const routes = app => {
  app
    .route('/orders')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getOrders)
    .post(addNewOrder);

  app
    .route('/orders/:orderId')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);
};

export default routes;
