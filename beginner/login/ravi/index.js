const express = require('express')
const app = express()
const port = 2022;
//const dbConn = require('./lib/db');

const loginRouter = require('./src/router/loginUserRouter');

app.use('/login',loginRouter);


// app.get('/login', function (req, res) {
//     dbConn.query('SELECT * FROM login ', function (error, results) {
//       return res.send({data : results})
  // if (error) throw error;
 //  return res.send({ error: false, data: results, message: 'users list.' });
    
//     });
//     });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
