const routes = app => {
  app
    .route('/products')
    .get(
      (req, res, next) => {
        console.log(`request from: ${req.originalUrl}`);
        console.log(`request type: ${req.method}`);
        next();
      },
      (req, res, next) => {
        res.send('GET request succesfull from products!!');
      }
    )
    .post((req, res) => res.send('POST request succesfull from products!!'));

  app
    .route('/products/:productId')
    .put((req, res) => res.send('PUT request succesfull from products!!'))
    .delete((req, res) =>
      res.send('DELETE request succesfull from products!!')
    );
};

export default routes;
