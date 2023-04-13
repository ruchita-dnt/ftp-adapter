import dotenv from 'dotenv';

if (!dotenv) {
	throw new Error('Unable to use dot env lib');
}
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
	// This error should crash whole process
	throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
	/**
	 * Prod or development server
	 */
	ENV: 'DEV',

	// NAME: process.env.NAME,
	// VERSION: process.env.VERSION,

	/**
	 * Your favorite port
	 */
	port: 3000,
	// api_url: '0.0.0.0',
	// server_url: process.env.SERVER_URL,
	// admin_url: process.env.ADMIN_URL,

	// Public path
	// public_path: process.env.PUBLIC_PATH,

	/**
	 * API configs
	 */

	api: {
		prefix: '/',
	},

	ftpConfig: {
		host: 'dnt.files.com',
		port: 22,
		user: 'ruchita.shah@dntinfotech.com',
		password: 'Rns@19972906',
		secure: true, // Set to true if using FTPS
	}
	// ftpConfig: {
	// 	host: 'demo.wftpserver.com',
	// 	port: 21,
	// 	user: 'demo',
	// 	password: 'demo',
	// 	secure: false, // Set to true if using FTPS
	// }
};
