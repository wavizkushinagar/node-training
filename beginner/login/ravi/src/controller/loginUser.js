 var modelLogin = require('../model/loginModel'); 
exports.loginUser = (req , res)=>{
    modelLogin.getAllUsers((error,users)=>{
       // console.log('we are here');
        if(error)
        res.send(error);
       // console.log(`UserLogin`,users);
        res.send(users)
    })
}


// get login user by id

exports.loginUserId =(req,res)=>{
    //console.log('get user id');
    modelLogin.getLoginIdModel(req.params.id,(error,users)=>{
        if(error)
        res.send(error);
       // console.log(`single user data `,users);
        res.send(users)
    })
}