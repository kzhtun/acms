const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./src/utils/logger');
const sqlService = require('./src/services/sql');

const appExpress = express();
const PORT = process.env.PORT || 5000;

appExpress.use(cors());
appExpress.use(bodyParser.json());

// Logger middleware for HTTP requests
appExpress.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// Logger interceptor to record every API call and payload data
appExpress.use((req, res, next) => {
  logger.info(
    `API Call: ${req.method} ${req.originalUrl} | Payload: ${JSON.stringify(req.body)}`
  );
  next();
});

// Example: GET all users
appExpress.get('/api/users', async (req, res) => {
  try {
    const users = await sqlService.execQuery('SELECT * FROM Users');
    res.json(users);
  } catch (err) {
    logger.error(`Error fetching users: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

// Example: POST to add a user
appExpress.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    await sqlService.execQuery(
      'INSERT INTO Users (name, email) VALUES (@name, @email)',
      { name, email }
    );
    res.status(201).json({ message: 'User added' });
  } catch (err) {
    logger.error(`Error adding user: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

appExpress.listen(PORT, () => {
  logger.info(`Express server running on port ${PORT}`);
});