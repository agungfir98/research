import express from "express";
import "dotenv/config";
import { AccessToken } from "livekit-server-sdk";
import cors from "cors";

const app = express();

const createToken = () => {
	const roomName = "quickstart-room";
	const userName = `${Math.random(1, 10) * 100}`;

	const accessToken = new AccessToken(
		process.env.LK_API_KEY,
		process.env.LK_API_SECRET,
		{
			identity: userName,
		}
	);

	accessToken.addGrant({ roomJoin: true, room: roomName });

	return accessToken.toJwt();
};

app.use(
	cors({
		origin: "*",
	})
);
app.use("/", (_, res) => {
	res.send(createToken());
});

app.listen(8000, () => {
	console.log("app running on http://localhost:8000");
});
