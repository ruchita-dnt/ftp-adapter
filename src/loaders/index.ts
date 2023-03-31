/* eslint-disable no-console */
import expressLoader from './express';

export default async ({ expressApp }) => {
	// Load dependencies
	console.log('✌️ Dependency injector loaded');

	console.log('✌️ Express loaded');
	await expressLoader({ app: expressApp });
};
