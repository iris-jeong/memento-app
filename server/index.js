import express from 'express';
import config from 'config';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import debug from 'debug';
import auth from './routes/auth.js';
import entries from './routes/entries.js';
import tags from './routes/tags.js';
import { error } from './middleware/error.js';
import authMiddleware from './middleware/auth.js';

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
	console.log(process.env.NODE_ENV);

	res.send('Hello World!');
});
app.use('/api/auth', auth);
app.use('/api/entries', authMiddleware, entries);
app.use('/api/tags', tags);

app.use(error);

// Start the server
const PORT = config.get('port');
app.listen(PORT, () => startupDebug(`Listening on port ${PORT}...`));
