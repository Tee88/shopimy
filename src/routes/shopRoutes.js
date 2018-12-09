import {
  addNewShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop
} from '../controllers/ShopController';

const routes = app => {
  app
    .route('/shops')
    .get(getShops)
    .post(addNewShop);

  app
    .route('/shops/:shopId')
    .get(getShopById)
    .put(updateShop)
    .delete(deleteShop);
};

export default routes;
