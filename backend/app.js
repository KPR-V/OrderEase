const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto= require("crypto")
 const cors = require('cors');
const path = require("path");
const adminschema = require("./models/admin");
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, // to allow credentials (including cookies) to be sent from the client's origin to the express server 
 optionsSuccessStatus: 200
  }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const isloggedin = (req, res, next) => {
    try {
        if (!req.cookies.token || req.cookies.token === "") {
            res.redirect("/login");
        } else {
            let data = jwt.verify(req.cookies.token, "secretkey");
            req.user = data;
            next();
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send('Invalid token');
        } else {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};


app.post("/register",async (req, res) => {
   const{ username ,name, email, password} = req.body;
   if(!username || !name || !email || !password){return res.send("fill all the inputs")}
   const copy = await adminschema.findOne({email:email})
   if(copy){return res.send("something went wrong")}
   
       bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(password, salt, async (err, hash) => {
           if (err) throw err;
           const admin = await adminschema.create({
               username:username,
               name:name,
               email:email,
               password:hash
           })
           const token = jwt.sign({email:email , name:name } , "secretkey")
           res.cookie("token", token, {httpOnly: true}) 
           //httpOnly is used to prevent the cookie from being accessed by javascript on the client side
            res.redirect("/admin-dashboard")
         });
       });
})

app.get("/admin-dashboard", isloggedin, (req, res) => {
    res.send("Welcome to admin dashboard");
})

app.get("/login", (req, res) => {
    res.send("Login page");
})

app.get("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the token cookie
    res.redirect("/login");
});



app.listen(3500)