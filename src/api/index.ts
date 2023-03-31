import { Router } from 'express';
import ftp from './routes/ftp';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	ftp(app);
	return app;
};
