import 'module-alias/register';
import app from './app';

const HOST: string = process.env.SERVER_HOST || '127.0.0.1';
const PORT: number = Number(process.env.SERVER_PORT) || 3000;

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}.`));