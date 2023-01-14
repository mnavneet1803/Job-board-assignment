const bcrypt = require("bcryptjs")
const User=require("../models/user.model")
const jwt = require('jsonwebtoken')
const config = require("../configs/auth.config")

// this function will be used as a controller in auth routes for singing up a user 

exports.signup = async (req,res)=>{
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        userType: req.body.userType
    }
    try {
        const data = await User.create(user)
        res.status(200).send({
            "message": "user created successful",
            data:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "message": "Some internal error occured"
        })
        
    }
}


// this function will be used as a controller in auth routes for singing in a user 
// we have used json-web-token for autherization and authentication 

exports.signin= async (req,res)=>{ 
    const users = await User.find({ email: req.body.email })
   if (users.length==0) {
        res.status(400).send({
            message: "Failed! Userid doesn't exist!"
        })
        return
    }
   if (!bcrypt.compareSync(req.body.password, users[0].password)) {
        console.log("Condition met")
        res.status(401).send({
            message: "Invalid Password!"
        })
        return
    }
    let token = jwt.sign({email: users[0].email }, config.secret, {
        expiresIn: 86400 // 24 hours
    })
    
    res.status(200).send({
        name:users.name,
        email:users.email,
        userType:users.userType,
        accessToken:token
    })
    
    return
}

