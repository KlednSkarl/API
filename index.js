// server.js
// Install this first before running the query npm install express mssql cors
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: 'Sys2023Dev@BMS',
  server: '116.50.222.51',
  port: 50130,
  database: 'TCM_CSS',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.get('/', (req, res) => {
  res.send('✅ RESTful API is running. Try /loans');
});

app.get('/loans', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM CS_tblLoan');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Database Error');
  } finally {
    sql.close();
  }
});

 