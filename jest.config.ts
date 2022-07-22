import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
	clearMocks: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
};
export default config;
