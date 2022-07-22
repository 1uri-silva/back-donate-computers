import fetch from 'cross-fetch';

describe('[API]', () => {
	test('get value alive', async () => {
		const response = await fetch('http://127.0.0.1:3000/', { method: 'GET' });
		const data = (await response.json()) as { alive: true };
		expect(data.alive).toEqual(true);
	});
});
