import {
  addNewShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop
} from '../controllers/ShopController';

import { validateBody, schemas } from './routeHelpers';

const routes = app => {
  app
    .route('/shops')
    .get(getShops)
    .post(validateBody(schemas.shopSchema), addNewShop);

  app
    .route('/shops/:shopId')
    .get(getShopById)
    .put(validateBody(schemas.shopSchema), updateShop)
    .delete(deleteShop);
};

export default routes;
