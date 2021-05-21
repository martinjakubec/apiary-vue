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
    if (err) {
      console.log(err);
    } else {
      console.log('db connected');
    }
  }
);

const app = express();

const helmetDirectives = require('./config/helmetConfig');
app.use(helmet(helmetDirectives));

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const verifyUser = require('./middleware/verifyUser');
app.use(verifyUser);

// routers
const HiveRouter = require('./routers/HiveRouter');
const UserRouter = require('./routers/UserRouter');
const ControlRouter = require('./routers/ControlRouter');
const TodoRouter = require('./routers/TodoRouter');

app.use('/api', HiveRouter);
app.use('/api', UserRouter);
app.use('/api', ControlRouter);
app.use('/api', TodoRouter);

app.get('/bzzz', (req, res, next) => {
  return res.send({status: 'bzzz', data: 'bzzz'});
});

app.use('/', express.static(path.join(__dirname, '..', 'public', 'dist')));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'index.html'))
});
app.listen(process.env.PORT);
