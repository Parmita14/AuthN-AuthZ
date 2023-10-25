const express = require("express")
const app = express();

require('dotenv').config();
const PORT =  process.env.PORT || 4000;
// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use(express.json());

require("./config/database").connect();

// Route import & mount
const user = require("./routes/user");
app.use("/api/v1",user);

// activate
app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`);
})