import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import multer from "multer";
import "dotenv/config";
import { Buffer } from "buffer";

const PORT = process.env.PORT;
const api_key = process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;
const cloud_name = process.env.CLOUDINARY_NAME;

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const cdn = cloudinary.v2;
cdn.config({
	api_key,
	api_secret,
	cloud_name,
});

app.use(
	cors({
		origin: "*",
	})
);

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
	res.send("hallo mothafuckar");
});

app.post("/upload", upload.single("gambar"), async (req, res) => {
	try {
		if (!req.file) return res.send("no fileee");
		const basenampat = `data:image/jpeg;base64,${Buffer.from(
			req.file.buffer
		).toString("base64")}`;

		const cdnResponse = await cdn.uploader.upload(basenampat);
		console.log(cdnResponse);

		res.send({
			cdnResponse,
		});
	} catch (error) {
		res.send(error);
		console.log(error);
	}
});

app.listen(PORT, () => {
	console.log(`app running on port ${PORT} http://localhost:${PORT}`);
});
