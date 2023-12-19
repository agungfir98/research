import "@livekit/components-styles";
import {
	LiveKitRoom,
	GridLayout,
	ParticipantTile,
	useTracks,
	ControlBar,
} from "@livekit/components-react";
import axios from "axios";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

const RoomConverence = () => {
	const [token, setToken] = useState<string>();

	useEffect(() => {
		axios.get(import.meta.env.VITE_BE_URL).then((res) => setToken(res.data));
	}, []);

	return (
		<div>
			<LiveKitRoom
				token={token}
				video
				audio
				serverUrl={import.meta.env.VITE_SERVER_URL}
				data-lk-theme="default"
				style={{ height: "100vh" }}
			>
				<MyVideoConferene />
				<ControlBar />
			</LiveKitRoom>
		</div>
	);
};

function MyVideoConferene() {
	const tracks = useTracks(
		[
			{
				source: Track.Source.Microphone,
				withPlaceholder: true,
			},
			{
				source: Track.Source.Camera,
				withPlaceholder: true,
			},
		],
		{ onlySubscribed: false }
	);

	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
		>
			<ParticipantTile />
		</GridLayout>
	);
}

export default RoomConverence;
