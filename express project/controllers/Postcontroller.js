const item = require("../models/Createitemmodel");
const user = require("../models/Usermodel")

const likehandler = async (req, res) => {
    try {
        const { userid } = req.body;
        const { itemid } = req.body;
        const isItem = await item.findById(itemid);


        console.log(userid)
        console.log(itemid)
        if (userid) {


            const alreadyliked = await isItem.likes.findIndex(
                (individualLike) => individualLike.user._id.toString() === userid
            );
            console.log("sjkldfjkl sdfkj" + alreadyliked);
            if (alreadyliked == -1) {
                await isItem.likes.push({ user: userid });
                const likepost = await isItem.save();

                if (likepost) {
                    res.json({ message: "post liked" });
                } else {
                    res.json({ message: "some error" });
                }
            } else {
                res.json({ message: "you already liked the post" });
            }
        } else {
            res.json({ message: "Loggin first" });
        }
    }

    catch (err) {
        console.log(err)
    }
};
const unlikehandler = async (req, res) => {

    try {
        const { userid } = req.body;
        const { itemid } = req.body;
        const isItem = await item.findById(itemid);
        console.log(itemid);
        console.log(userid); 

        const alreadylikedindex = isItem.likes.findIndex(
            like => like.user.toString() === userid
        );
        if (alreadylikedindex !== -1) {
            isItem.likes.splice(alreadylikedindex, 1);
            const unlikepost = await isItem.save();

            if (unlikepost) {
                res.json({ message: "post unliked" })
            } else {
                res.json({ message: "some error" })
            }
        } else {
            res.json({ message: "You havent liked the post yet " })
        }
    }
    catch (err) {
        console.log(err)
    }
}

const dislikehandler = async (req, res) => {
    const { userid } = req.body;
    const { itemid } = req.body;
    const isItem = await item.findById(itemid);

    try {

        if (userid) {
            const alreadydisliked = await isItem.dislikes.findIndex(
                (individualdislike) => individualdislike.user._id.toString() === userid
            );
            
            if (alreadydisliked == -1) {
                await isItem.dislikes.push({ user: userid });
                const dislikepost = await isItem.save();
                if (dislikepost) {
                    res.json({ message: "post disliked " })
                } else {
                    res.json({ message: "some error" })
                }

            } else {
                res.json({ message: "you already disliked the post" })
            }

        } else {
            res.json ({message:"login first"})
        }

    }
    catch (err) {
        console.log(err);
    };
}



const undislikehandler = async (req, res )=>{
    
     
    try { 
        const {userid} = req.body;
        const { itemid} = req.body;
        const isiTem = await item.findById(itemid);
         
         const alreadydislikedindex = isiTem.dislikes.findIndex(
          dislike => dislike.user.toString()=== userid
         );
         if (alreadydislikedindex !== -1){
            isiTem.dislikes.splice (alreadydislikedindex,1);
            const undislike = await isiTem.save ();

            if ( undislike) {
                res.json ({message: "post undisliked"})
            }
            else{
                res.json ({message: "some error"})
            }
         } else {
            res.json ({message: " you havent disliked the post"})
         }

        
    }
    catch (err ) {
   console.log ( err )
    }
}


const reviewhandler = async (req, res)=>{
    const {itemid ,userid,rating,comment}=req.body
    const isiTem=  await item.findById (itemid);
    try{
        if ( !userid){
            res. json ({message: " login first"})
        }
        const newreview= {user:userid,rating,comment};
        const alreadyreviewed = await isiTem.reviews.findIndex(
            (review)=> review.user._id.toString()=== userid
        );
        if (alreadyreviewed !== -1){
            res. json ({message: " you already reviewed the post"})
        }
        isiTem.reviews.push (newreview);
        const reviewpost = await  isiTem. save();
        if (reviewpost){
            res. json ({message: "post reviewed"})
        } else{
            res. json ({message: " some error"})
        }
    }
    catch (err) {
        console.log ( err)
    }

}

module.exports = { likehandler, unlikehandler,dislikehandler,undislikehandler,reviewhandler };