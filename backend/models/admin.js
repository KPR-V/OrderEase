const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/orderease")
const adminschema = mongoose.Schema({
username: {type:String , required:true, unique:true},
name: {type:String , required:true, unique:true},
email: {type:String , required:true, unique:true,lowercase:true},  
password:{ type:String, required:true, minlength:8},
})
module.exports = mongoose.model("admin", adminschema)