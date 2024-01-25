import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from "cloudinary";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// api/my-hotels
router.post("/", upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel = req.body;
        // upload images to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            // convert image to base64
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data" + image.mimetype + ";base64," + b64;
            // use cloudinary sdk to upload image to cloudinary account
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);

        // if upload was successful, add the URLS to the new hotel
        

        // save the new hotel in the database

        // return a 201 status
        
    } catch(error) {
        console.log("Error creating hotel: ", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});