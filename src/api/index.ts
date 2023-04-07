import { Router } from 'express';
import ftp from './routes/ftp';
import hello from './routes/hello';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	ftp(app);
	hello(app);
	return app;
};
