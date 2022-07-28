import { Router, Request, Response } from 'express';
import { celebrate } from 'celebrate';
import { ValidateErrors } from '../error-validate';

export const router = Router();

const validateFields = new ValidateErrors();

router.get('/', (request: Request, response: Response) => {
	response.status(200).json({ alive: true });
});

router.post(
	'/donation',
	celebrate(validateFields.validateFields),
	(request: Request, response: Response) => {
		response.status(200).json({ success: true });
	}
);
