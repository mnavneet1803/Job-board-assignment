const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")

let userType
const verifyToken = async (req,res,next)=>{

    let token = req.headers['x-access-token']
    
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, authConfig.secret,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
          else{
         
            // userType = decoded.userType
            req.email = decoded.email
            console.log(">>>>>>>",req.email)
            // console.log("userType",userType)
            next()
          }
        })
}
const isRecruiter = async (req,res,next)=>{

    const user = await User.find({
        email: req.email
    })
      
    console.log("isRecruiter usertype",user[0].userType)
    if( user[0].userType == "Recruiter") {
        next();
    } else {
        res.status(403).send({
            message: "Recruiter Required!"
        })
        return;
    }
    
}

const isCandidate = async (req,res,next)=>{

    const user = await User.find({
        email: req.email
    })
      
    console.log("isRecruiter usertype",user[0].userType)
    if( user[0].userType == "Candidate") {
        next();
    } else {
        res.status(403).send({
            message: "Candidate Required!"
        })
        return;
    }
    
}
module.exports = {
    verifyToken:verifyToken,
    isRecruiter:isRecruiter,
    isCandidate:isCandidate
}