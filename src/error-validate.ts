import { Joi, Segments } from 'celebrate';

export class ValidateErrors {
	validateFields = {
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			complement: Joi.string().required(),
			deviceCount: Joi.number().required(),
			devices: Joi.array()
				.items(
					Joi.object().keys({
						condition: Joi.string().required(),
						type: Joi.string().required(),
					})
				)

				.length(Joi.ref('deviceCount')),
			email: Joi.string().email().required(),
			neighborhood: Joi.string().required(),
			number: Joi.string().required(),
			phone: Joi.string().required(),
			state: Joi.string().required(),
			streetAddress: Joi.string().required(),
			zip: Joi.string().required(),
			city: Joi.string().required(),
		}),
	};
}
