import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRoutes from './src/routes/productRoutes';
import shopRoutes from './src/routes/shopRoutes';
import orderRoutes from './src/routes/orderRoutes';
import lineItemRoutes from './src/routes/lineItemRoutes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27018/SHOPIMYdb',
  { useNewUrlParser: true }
);

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-with, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });

// Error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Internal Server Error'
    }
  });
});

productRoutes(app);
shopRoutes(app);
orderRoutes(app);
lineItemRoutes(app);

app.get('/', (req, res) => {
  res.send(`Node and express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
