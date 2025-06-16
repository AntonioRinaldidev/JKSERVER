require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const setupSwagger = require('./swaggerConfig');
const cookieparsers = require('cookie-parser');
const { consoleLogCustom } = require('./utilities/utilities');

const userRoutes = require('./Routes/User');
const tokenRoutes = require('./Routes/Token');
const fileDownloadRoutes = require('./Routes/FileDownload');
const contact = require('./Routes/Contact');
const pdf = require('./Routes/CvGenerator');

//**DB CONNECTION */
mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		consoleLogCustom(
			`[Connection Status ✔] ~`,
			'orange',
			` Connected To Database`,
			'purple'
		);
		consoleLogCustom(
			`[Database Info] ~`,
			'orange',
			` ${process.env.DB_CONNECTION.split('/')[3]}`,
			'purple'
		);
	})
	.catch((err) =>
		consoleLogCustom(
			'[Connection Status❌] ~ MongoDB connection error:' + err,
			'red'
		)
	);

const app = express();
setupSwagger(app);

app.use(express.json());
app.use(cookieparsers());

// ✅ CORS aggiornato per produzione:
const allowedOrigins = [
	'http://localhost:3000',
	'https://antoniorinaldidev.com',
	'https://www.antoniorinaldidev.com',
	'http://localhost:4000',
];
app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (like mobile apps or curl)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

// ✅ Handle preflight requests (se vuoi mantenerlo)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();
	next();
});

//**ROUTE SECTION */
app.use('/api/users', userRoutes);
app.use('/api/auth', tokenRoutes);
app.use('/api/download', fileDownloadRoutes);
app.use('/api/contact', contact);
app.use('/public', express.static('Public'));
app.use('/api/cv', pdf);

// ✅ Ascolta su tutte le interfacce, non solo localhost
app.listen(process.env.PORT, '0.0.0.0', () =>
	consoleLogCustom(
		`[Server Info] ~`,
		'orange',
		`http://localhost:${process.env.PORT}`,
		'purple'
	)
);
