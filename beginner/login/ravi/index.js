const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2022;
const dbConn = require("./lib/db");
//const { json } = require("body-parser");

app.use(bodyParser.json());

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.post("/login", function (req, res) {
  var userEmail = req.body.email;
  var userPassword = req.body.password;

  // console.log("Request Object", JSON.stringify(req));
  // console.log("Request Object", JSON.stringify(req.body));
  // console.log("Request Object", JSON.stringify(req.params));


  if (userEmail && userPassword) {
    dbConn.query(
      `SELECT * FROM login WHERE email = ?;`,
      userEmail,
      function (error, result) {
        if (error) {
          console.log("Data base query error", error.message);
          return res
            .status(400)
            .send({ error: true, message: "Something went wrong" });
        }
        if (result.length>0) {
          if (result[0]["password"] === userPassword) {
            console.log("User login successful");
            return res.status(200).send({ msg: "login successfully" });
          } else {
            console.log("User password missmatch");
            return res.status(401).send({ msg: " password is incorrect!" });
          }

        } else {
          console.log("User not exist");
          return res.status(401).send({ msg:"User does not exists"})
        }
      }
    );
  } else {
    console.log("email or password field blank");
    return res.status(401).send({ msg: " email or password field blank!" });
  }
});

app.post("/user", function (req, res) {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  // console.log("Request Object", JSON.stringify(req));
  // console.log("Request Object", JSON.stringify(req.body));
  // console.log("Request Object", JSON.stringify(req.params));
  if (!data) {
    console.log("User details are missing");
    return res
      .status(400)
      .send({ msg: "Please provide user details" });
  }
  const { name, email, password } = req.body;
  if (name && password && email) {
    dbConn.query(
      "INSERT INTO login SET ? ",
      data,
      function (error, results, fields) {
        if (error) {
          console.log("Data base query error", error.message);
          return res.status(400).send({  msg: "User Already registered " });
        }
        console.log("Request Processed successful");
        return res.send({error: false,data: results, msg: "New user has been created successfully.",
        });
      }
    );
  } else {
    console.log("Validation Error");
    return res
      .status(204)
      .send({
        error: true,
        message: "Validation error: Required field is missing",
      });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
