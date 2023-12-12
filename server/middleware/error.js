const error = (err, req, res, _next) => {
	res.status(500).send('Something failed');
};

export { error };
