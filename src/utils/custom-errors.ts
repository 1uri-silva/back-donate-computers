import { isCelebrateError } from 'celebrate';
import { NextFunction, Response, Request } from 'express';

export function customErrors() {
	return (error: any, req: Request, res: Response, next: NextFunction) => {
		if (!isCelebrateError(error)) {
			return next(error);
		}

		let result!: {
			error: boolean;
			requiredFields: (string | number)[];
			errorMessage: string;
		};

		for (const [segment, joiError] of error.details.entries()) {
			result = joiError.details.map((err) => {
				const type_split = err.type.split('.')[1];
				if (err.type === 'array.length') {
					return {
						error: true,
						requiredFields: err.path,
						errorMessage:
							'A quantidade de equipamentos não está de acordo com as informações de equipamentos enviados.',
					};
				} else if (type_split === 'required') {
					return {
						error: true,
						requiredFields: err.path,
						errorMessage: 'Todos os campos obrigatórios devem ser informados.',
					};
				} else {
					return {
						error: true,
						requiredFields: err.path,
						errorMessage: `Houve um erro na campo ${err.context?.key}.`,
					};
				}
			})[0];
		}
		return res.status(400).json(result);
	};
}
