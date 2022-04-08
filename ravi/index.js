const express = require('express')
const app = express()
const port = 2022;
const dbConn = require('./lib/db');

// const autor = require('./autor');
// app.use(autor)

app.get('/login', function (req, res) {
    dbConn.query('SELECT * FROM login', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
    });
    });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
