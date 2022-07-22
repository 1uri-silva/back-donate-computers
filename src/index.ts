import express, { Request, Response } from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
	response.status(200).json({ alive: true });
});

app.listen(PORT, () => console.log(`[API] - is running on port: ${PORT}`));
