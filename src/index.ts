import express from 'express';
import { customErrors } from './utils/custom-errors';
import { router } from './routes/routes';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(router);
app.use(customErrors());

app.listen(PORT, () => console.log(`[API] - is running on port: ${PORT}`));
