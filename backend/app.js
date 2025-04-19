const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

require('./config/mqtt');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const telemetriaRoutes = require('./routes/telemetria');

const app = express(); // ✅ Solo una instancia

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/telemetria', telemetriaRoutes); // ✅ Ruta de API

module.exports = app;
