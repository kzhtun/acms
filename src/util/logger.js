const { createLogger, format, transports } = require('winston');

const transport = new winston.transports.DailyRotateFile({
	filename: "logs/application-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	maxSize: "10m",
	maxFiles: "15d",
});


const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports
});

module.exports = logger;