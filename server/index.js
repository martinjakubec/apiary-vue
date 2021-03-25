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
    if(err) {
      console.log(err);
    } else {
      console.log('db connected');
    }
  }
);

const app = express();

const helmetDirectives = require('./config/helmetConfig')

app.use(helmet(helmetDirectives));
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const verifyUser = require('./middleware/verifyUser');
app.use(verifyUser);

app.use(express.static(path.join(__dirname, '..', 'public')));

// routers
const HiveRouter = require('./routers/HiveRouter');
const UserRouter = require('./routers/UserRouter');
const ControlRouter = require('./routers/ControlRouter');

app.use(HiveRouter);
app.use(UserRouter);
app.use(ControlRouter);

app.get('/bzzz', (req, res, next) => {
  return res.send({status: 'bzzz', data: 'bzzz'});
});

app.listen(process.env.PORT);
