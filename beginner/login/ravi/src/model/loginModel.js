var dbConn = require('../../lib/db');

var UserLogin = (users) =>{
    this.id = users.id;
    this.email = users.email;
    this.password = users.password;
    this.status = users.status? users: 1;
}

// get all user 
UserLogin.getAllUsers = (result) =>{
    dbConn.query('SELECT * FROM login',(error, res)=>{
        if(error){
            //console.log(`error all fetching users`, error);
            result(null,error);

        } else{
            //console.log(`data fetched success`);
            result(null, res)
        }
    })

}


UserLogin.getLoginIdModel = (id, result) =>{
    dbConn.query('SELECT * FROM login WHERE id=?',id,(error,res)=>{
        if(error){
           // console.log(`Error all data by id `,error)
            result(null,error);
        }else{
            result(null,res);
        }
    })

}


module.exports = UserLogin;