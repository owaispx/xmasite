const mongoose = require ("mongoose")

const user = mongoose.model("user",{

    username : String,
    password : String,


})
module.exports= user