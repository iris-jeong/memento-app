import express from 'express';
import config from 'config';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import debug from 'debug';
import users from './routes/users.js';

// Initialize the Express app
const app = express();

// Create debug instances for different parts of the application
const dbDebug = debug('app:db');
const startupDebug = debug('app:startup');

// Middlewares
app.use(helmet());
app.use(express.json());

// Morgan logging setup for development environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Connect to MongoDB
const mongoUri = config.get('db.uri');
mongoose
	.connect(mongoUri)
	.then(() => dbDebug(`Connected to ${mongoUri}...`))
	.catch(() => dbDebug("Couldn't connect"));

// Routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.use('/users', users);

// Start the server
const PORT = config.get('port');
app.listen(PORT, () => startupDebug(`Listening on port ${PORT}...`));
