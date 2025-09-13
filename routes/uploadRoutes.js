const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null,  file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

//file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);


if(ext && mime){
    cb(null, true);
}else{
    cb(new Error("Only images are allowed"));
}
};

const upload = multer({ storage:storage , fileFilter:fileFilter})


//route to upload an image
router.post("/upload", upload.single("image"),(req,res) => {
    try{
        res.json({message: "Image uploaded successfully", file: req.file,})
    } catch(err){
        res.status(400).send({error: err.message})
    }
});

module.exports = router;


// {
//     "message": "Image uploaded successfully",
//     "file": {
//         "fieldname": "image",
//         "originalname": "360_F_691063382_SOlKzFI1anx1BGkDxOAAIPiFDQF32tzG.jpg",
//         "encoding": "7bit",
//         "mimetype": "image/jpeg",
//         "destination": "uploads/",
//         "filename": "image-1757759166152.jpg",
//         "path": "uploads\\image-1757759166152.jpg",
//         "size": 55194
//     }
// }