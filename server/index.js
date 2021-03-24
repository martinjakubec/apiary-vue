const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const db = mongoose.connect(
  process.env.DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    console.log('db connected');
  }
);

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routers
const HiveRouter = require('./routers/HiveRouter');
const UserRouter = require('./routers/UserRouter');
const ControlRouter = require('./routers/ControlRouter');

app.use(HiveRouter);
app.use(UserRouter);
app.use(ControlRouter);

app.get('/router', (req, res, next) => {
  res.send('coucou');
});

app.listen(process.env.PORT);
console.log('listening at port ', process.env.PORT);
