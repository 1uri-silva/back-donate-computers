import fetch from 'cross-fetch';

type ResponseError = {
	error: string;
	requiredFields: string[];
	errorMessage: string;
};

describe('[API] - donation', () => {
	test('create donation success', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Roberto Manuel Almeida',
				email: 'roberto.manuel.almeida@molsanto.com',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				deviceCount: 2,
				devices: [
					{ type: 'notebook', condition: 'working' },
					{ type: 'notebook', condition: 'working' },
				],
			}),
		});
		const data = (await response.json()) as { success: true };
		expect(response.status).toEqual(200);
		expect(data.success).toEqual(true);
	});

	test('create donation missing field', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// name: 'Roberto Manuel Almeida',
				// email: 'roberto.manuel.almeida@molsanto.com',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				devices: [
					{ type: 'notebook', condition: 'working' },
					{ type: 'notebook', condition: 'working' },
				],
			}),
		});
		const data = (await response.json()) as ResponseError;
		expect(response.status).toEqual(400);
		expect(data.errorMessage).toEqual(
			'Todos os campos obrigatórios devem ser informados.'
		);
	});

	test('email is no valid', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Roberto Manuel Almeida',
				email: 'roberto.manuel.almeida@molsanto',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				deviceCount: 2,
				devices: [
					{ type: 'notebook', condition: 'working' },
					{ type: 'notebook', condition: 'working' },
				],
			}),
		});
		const data = (await response.json()) as ResponseError;
		expect(response.status).toEqual(400);
		expect(data.errorMessage).toEqual('Houve um erro na campo email.');
	});

	test('field devices length with error', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Roberto Manuel Almeida',
				email: 'roberto.manuel.almeida@molsanto.com',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				deviceCount: 1,
				devices: [
					{ type: 'notebook', condition: 'working' },
					{ type: 'notebook', condition: 'working' },
				],
			}),
		});
		const data = (await response.json()) as ResponseError;
		expect(response.status).toEqual(400);
		expect(data.errorMessage).toEqual(
			'A quantidade de equipamentos não está de acordo com as informações de equipamentos enviados.'
		);
	});

	test('field devices with type invalid', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Roberto Manuel Almeida',
				email: 'roberto.manuel.almeida@molsanto.com',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				deviceCount: 1,
				devices: [{ type: 2, condition: 'working' }],
			}),
		});
		const data = (await response.json()) as ResponseError;
		expect(response.status).toEqual(400);
		expect(data.errorMessage).toEqual('Houve um erro na campo type.');
	});

	test('no data field devices', async () => {
		const response = await fetch('http://127.0.0.1:3000/donation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Roberto Manuel Almeida',
				email: 'roberto.manuel.almeida@molsanto.com',
				phone: '8227001156',
				zip: '57071816',
				city: 'Maceió',
				state: 'AL',
				streetAddress: 'Rua Costa do Marfim',
				number: '906',
				complement: 'Perto de algum lugar',
				neighborhood: 'Clima Bom',
				deviceCount: 0,
			}),
		});
		const data = (await response.json()) as { success: true };
		expect(response.status).toEqual(200);
		expect(data.success).toEqual(true);
	});
});
