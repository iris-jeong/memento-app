import debug from 'debug';

const errorDebug = debug('app:error');

const error = (err, req, res, _next) => {
	errorDebug(err);

	const statusCode = err.statusCode || 500;
	let message = 'An unexpected error occurred';

	if (process.env.NODE_ENV === 'development') {
		message = err.message || message;
	}
	res.status(statusCode).send({ error: message });
};

export { error };
