const express = require("express")
const multer = require('multer');
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const { Registerhandler,Loginhandle,deleteuser} = require("./controllers/Usercontroller")
const cors = require ("cors")
const multermid = require("./Middlewares/Multer")
const { createItemHandler, getAllItems } = require("./controllers/Admincontroller")
const { likehandler,unlikehandler, dislikehandler, undislikehandler, reviewhandler} = require ("./controllers/Postcontroller")

const port = 4000  
const url = 'mongodb://localhost:27017/projectDB'

const server = express();
server.use(bodyparser.json())
server.use(cors());

if (mongoose.connect(url)) (
    console.log(`database connect on ${url}`)
)

else {
    console.log("database error")
}

server.post("/user/Register", Registerhandler);
server.post("/user/Login", Loginhandle);
server.post("/user/Delete", deleteuser);
server.post("/user/Create",multermid, createItemHandler);
server.post("/user/like",likehandler)
server.post("/user/unlike",unlikehandler)
server.post("/user/dislike",dislikehandler)
server.post("/user/undislike",undislikehandler)
server.post("/user/review",reviewhandler)


server.get("/user/showitems", getAllItems);




server.listen(port, () => {
    console.log(`server started on port ${port}`)
})

