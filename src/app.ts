import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { error, notFound } from './middlewares';
import router from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/v1', router);
app.use(notFound);
app.use(error);

export default app;