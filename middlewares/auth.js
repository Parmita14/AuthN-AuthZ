// auth, isStudent , isAmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{

    try{
        // extract jwt token
        // other ways to fetch token

        console.log("cookie",req.cookies.token);
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Message",
            });
        }
        // verify the token 
        try{
            const payload =  jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }catch(error){
            return res.status(401).json({
                success: false,
                message:'token is invalid',
            });
        }
        next();


    }catch(error){
        res.status(401).json({
            success:false,
            message:'something went wrong wile verifying the token'
        });
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== 'Student'){
            res.status(401).json({
                success:false,
                message:'This is a protected route for students',
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== 'Admin'){
            res.status(401).json({
                success:false,
                message:'This is a protected route for Admin',
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}