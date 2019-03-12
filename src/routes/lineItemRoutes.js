import {
  addNewLineItem,
  getLineItems,
  getLineItemById,
  updateLineItem,
  deleteLineItem
} from '../controllers/lineItemController';

import { validateBody, schemas } from './routeHelpers';

const routes = app => {
  app
    .route('/lineItems')
    .get((req, res, next) => {
      console.log(`request from: ${req.originalUrl}`);
      console.log(`request type: ${req.method}`);
      next();
    }, getLineItems)
    .post(validateBody(schemas.lineItemSchema), addNewLineItem);

  app
    .route('/lineItems/:lineItemId')
    .get(getLineItemById)
    .put(validateBody(schemas.lineItemSchema), updateLineItem)
    .delete(deleteLineItem);
};

export default routes;
