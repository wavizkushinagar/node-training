const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 2022;
const dbConn = require('./lib/db');

// const loginRouter = require('./src/router/loginUserRouter');
// app.use('/login',loginRouter);


// parse request data 
// app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

//login user api

app.get('/login', function (req, res) {

  var userEmail = req.body.email;
  var userPassword = req.body.password;

     if(userEmail && userPassword ){
      // console.log(" not blank")
     // console.log(userEmail);
      //console.log(userPassword)
      //`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,

      dbConn.query(`SELECT * FROM login WHERE email = ${db.escape(req.body.email)};`, function (error, result){
       
       console.log(result)
       return res.send({data : result})

      })



     }else{
       console.log('email and password field blank')
     }


  //   dbConn.query('SELECT * FROM login ', function (error, results) {
  //    // return res.send({data : results})
  // if (error) throw error;
  // return res.send({ error: false, data: results, message: 'users list.' });
    
  // });
    });





    // Add a new user  
app.post('/user', function (req, res) {
 // let user = req.body.id;

 /**
  * @Ravi Do not use id
  */
   let data = {
   //  id:req.body.id,  // @Ravi Comment this line and run
     name:req.body.name,
     email:req.body.email,
     password :req.body.password
   }
  //console.log(user)
  //res.send("user")
  if (!data) {   
    //console.log("plz provide data") 
   return res.status(400).send({ error:true, message: 'Please provide user details' });
   
  }

  const {name, email, password} = req.body;

  if (name && password &&  email) { 
    
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
   
    dbConn.query("INSERT INTO login SET ? ", data, function (error, results, fields) {
      if (error) {
        console.log("Data base query error", error.message);
        return res.status(400).send({ error:true, message: 'Something went wrong' });
      }
      console.log("Request Processed successful");
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
      });
      
  }
  else{
    console.log("Validation Error");
    return res.status(204).send({ error:true, message: 'Validation error: Required field is missing' });
  }

});
  
  /**
   * @Ravi Validate Name, email and password it should not be undefined or empty
   */


  
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
