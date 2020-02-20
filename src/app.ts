import express from 'express';
import bodyParser from 'body-parser';
import { error, notFound } from './middlewares';
import router from './router';
import helmet from 'helmet';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(notFound);
app.use(error);

export default app;