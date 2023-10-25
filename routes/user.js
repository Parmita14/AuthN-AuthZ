const express = require("express");
const router = express.Router();

const {signup , login} = require("../controllers/Auth");
const {auth, isStudent,isAdmin} = require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);
// testing route with single middleware
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for test'
    });
})

// Protected route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for student'
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for Admin'
    });
})

module.exports = router;