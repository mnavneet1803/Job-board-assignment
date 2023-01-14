const User = require("../models/user.model")

const validation = async (req,res,next)=>{
    if(req.body.name&&req.body.email&&req.body.password){
        try {
            const data= await User.find({
                email:req.body.email
            })
            console.log("data",data)
            if(data.length>0){
                res.status(400).send({message:"email already exists"})
            }else{
                next();
            }
        } catch (error) {
            res.status(500).send({message:"Some internal error occured"})
        }
    }
    else{
        res.status(500).send({message:"Provide Complete details"})
    }
}

module.exports={
    validation:validation
}