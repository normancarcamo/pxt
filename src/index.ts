import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { error, notFound } from './middlewares';
import router from './router';

const app = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(router);
app.use(notFound);
app.use(error);

app.listen(port, () => console.log('Server running on port 3000.'));