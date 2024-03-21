const bcrypt = require("bcrypt")
const user = require("../models/Usermodel")
const jwt = require("jsonwebtoken");
const { request } = require("express");


const Registerhandler = async (req, res) => {

    try {

        const { username, password } = req.body;

        const Existinguser = await user.findOne({ username });

        if (!Existinguser) {

            if (username !== "" && password !== "") {

                const hashedpassword = await bcrypt.hash(password, 10)
                const newuser = new user({ username, password: hashedpassword });
                await newuser.save();
                res.json({ message: "Regestration successfull!" });
            } else {
                res.json({ message: "All credentials required !" });
            }
        } else {

            res.json({ message: "User already exist!" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: "something went wrong" })

    }
};

const Loginhandle = async (req, res) => {
    try {
        const { username, password } = req.body

        if (username !== "" && password !== "") {
            const isuser = await user.findOne({ username });
            if (isuser) {
                const passvarify = await bcrypt.compare(password, isuser.password);
                if (passvarify) {
                    const token = await jwt.sign({ _id: isuser._id }, "oursecretkey")
                    res.json({ message: "logged in succesfully", token })
                } else {
                    res.json({ message: "Password incorrect " })
                }


            } else {
                res.json({ message: "user not found  " })

            }

        } else {
            res.json({ message: "All credentials required " })

        }
    }
    catch (err) {
        console.log(err)
    }



}

const deleteuser = async (req, res) => {
    try {
        const id = req.body.id;
        const deluser = await user.findByIdAndDelete(id)

        if (deluser) {
            res.json({ message: "User's account deleted" });

        }
        else {
            res.json({ message: "User not found " });
        }

    } catch (err) {
        console.log(err);
    }

}

module.exports = { Registerhandler, Loginhandle, deleteuser };