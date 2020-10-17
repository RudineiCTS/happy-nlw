import express from 'express';
import path from 'path';
import 'express-async-errors'; //modulo para lidar com erros
import cors from 'cors';

import routes from './routes/index';
import '../database/connection';
import errorHandle from '../errors/handle';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', '..','..', 'uploads')))
app.use(errorHandle);

app.listen(3333, ()=> console.log("server started!"));