import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

import routes from './src/routes/index';

dotenv.config();
require('./src/config/sequelize');

const app = express();

app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(`${__dirname}/src/public`));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
