import {
  addNewOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController';

import { validateBody, schemas } from './routeHelpers';

const routes = app => {
  app
    .route('/orders')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getOrders)
    .post(validateBody(schemas.orderSchema), addNewOrder);

  app
    .route('/orders/:orderId')
    .get(getOrderById)
    .put(validateBody(schemas.orderSchema), updateOrder)
    .delete(deleteOrder);
};

export default routes;
