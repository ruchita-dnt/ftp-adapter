import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import common_routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
	/**
	 * Health Check endpoints
	 * @TODO Explain why they are here
	 */

	// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
	// It shows the real origin IP in the heroku or Cloudwatch logs
	app.enable('trust proxy');

	// The magic package that prevents frontend developers going nuts
	// Alternate description:
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());

	// Middleware that transforms the raw string of req.body into json
	// app.use(bodyParser.json());
	//support parsing of application/x-www-form-urlencoded post data
	// app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '150mb', extended: true, parameterLimit: 500000000 }));

	// Load API routes
	app.use(config.api.prefix, common_routes());

	// Catch celebrate generated errors
	app.use((err, req, res, next) => {
		next(err);
	});

	// / catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Route Not Found');
		err['status'] = 404;
		next(err);
	});

	// / error handlers
	app.use((err, req, res, next) => {
		/**
		 * Handle 401 thrown by express-jwt library
		 */
		if (err.name === 'UnauthorizedError') {
			return res
				.status(err.status)
				.send({ message: err.message })
				.end();
		}
		return next(err);
	});
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});
};
