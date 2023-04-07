/* eslint-disable no-console */
import config from './config';
import express from 'express';
import 'reflect-metadata';
// import * as path from 'path';

async function startServer() {
	const app = express();

	/**
	 * A little hack here
	 * Import/Export can only be used in 'top-level code'
	 * Well, at least in node 10 without babel and at the time of writing
	 * So we are using good old require.
	 **/
	await require('./loaders').default({ expressApp: app });
	// app.use(express.static(path.join(__dirname, 'public')));

	app.listen(config.port, err => {
		if (err) {
			console.log(err);
			process.exit(1);
			return;
		}
		console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port}   🛡️
      ################################################
    `);
	});
}

startServer();