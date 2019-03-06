import {
  addNewLineItem,
  getLineItems,
  getLineItemById,
  updateLineItem,
  deleteLineItem
} from '../controllers/lineItemController';

const routes = app => {
  app
    .route('/lineItems')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getLineItems)
    .post(addNewLineItem);

  app
    .route('/lineItems/:lineItemId')
    .get(getLineItemById)
    .put(updateLineItem)
    .delete(deleteLineItem);
};

export default routes;
