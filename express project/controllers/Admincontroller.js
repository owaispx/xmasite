const cloudinary = require("../Utils/Cloudinary")
const multer = require('multer');
const Item = require("../models/Createitemmodel")


const createItemHandler = async (req, res) => {
    try {
        
        try {
            const { title, description } = req.body;

            const image = req.file.path;

            if (title !== "" && description !== "") {
                const upload = await cloudinary.uploader.upload(image, {
                    folder: "mr khan items",
                });
                const imageUrl = upload.secure_url;

                if (upload) {
                    const newItem = new Item({ title, description, imageUrl });
                    const savedItem = await newItem.save();

                    if (savedItem) {
                        res.json({ message: "Item saved successfully" });
                    } else {
                        res.json({ message: "File system error" });
                    }
                } else {
                    res.json({ message: "Cloudinary error" });
                }
            } else {
                res.json({ message: "All fields required" });
            }
        } catch (err) {
            console.log(err);

        }
    } catch (err) {
        console.log(err)
    }

};

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        if (items) {
            res.json(items);
            console.log(items)
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createItemHandler, getAllItems };