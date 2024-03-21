const mongoose=require("mongoose")

const item = mongoose.model('item',{
     title : String,
     imageUrl: String ,
     description: String,

     likes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],

       dislikes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],

     reviews :[
          { 
               rating :Number,
               comment: String,
               user : {
                 type : mongoose.Schema.Types.ObjectId,
                 ref : "User"
               },
               createdAt :{
                type:Date,
                default:Date.now
               }

          }
     ],
     price: Number,  
     

})
module. exports = item