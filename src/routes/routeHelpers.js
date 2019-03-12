import * as yup from 'yup';

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      schema
        .validate(req.body)
        .then(() => {
          next();
        })
        .catch(err => {
          res.status(400).json({
            error: err.message
          });
        });
    };
  },

  schemas: {
    productSchema: yup.object().shape({
      name: yup
        .string()
        .max(50)
        .required(),
      description: yup.string().required(),
      price: yup
        .number()
        .min(0)
        .required(),
      onSale: yup.boolean(),
      salePrice: yup
        .number()
        .test('valid', 'sale price must be less tha original price', function(
          value
        ) {
          const { price } = this.parent;
          return price > value;
        }),
      inStock: yup.boolean(),
      genre: yup
        .mixed()
        .oneOf(['camera', 'lense', 'drone', 'other'])
        .required()
    }),
    shopSchema: yup.object().shape({
      name: yup
        .string()
        .max(25)
        .required()
    }),
    orderSchema: yup.object().shape({
      totalPrice: yup.number().min(0)
    }),
    lineItemSchema: yup.object().shape({
      quantity: yup
        .number()
        .min(1)
        .required(),
      totalPrice: yup.number()
    })
  }
};
