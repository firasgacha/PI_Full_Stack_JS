import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import chatStyle from "./index.module.css";
import { Fab } from "@mui/material";
import { Paper } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import ReactGiphySearchbox from "react-giphy-searchbox";

const style = {
	container: {
		width: "100vw",
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "50vw",
		height: "50vh",
		maxWidth: "500px",
		maxHeight: "700px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		position: "relative",
	},
	messagesBody: {
		width: "calc( 100% - 20px )",
		margin: 10,
		overflowY: "scroll",
		height: "calc( 100% - 80px )",
	},
	wrapForm: {
		display: "flex",
		justifyContent: "center",
		width: "95%",
		margin: `auto`,
	},
	wrapText: {
		width: "100%",
	},
};

export default function GifPopUp(props) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<button className={chatStyle.btn} onClick={handleOpen}>
				<i className="fas fa-smile"></i> GIF
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div style={style.container}>
						<Paper style={style.paper}>
							<ReactGiphySearchbox
								apiKey="1s5jtoUfLA0XGnTTqd4758LyvOIJeLxR"
								onSelect={(item) => {
									console.log(item);
									props.socket.emit("chatMessage", {
										msg: {
											content: "A gif:",
											image: item.images.downsized.url,
										},
										idRoom: props.id,
									});
									handleClose();
								}}
								masonryConfig={[
									{ columns: 2, imageWidth: 110, gutter: 5 },
									{ mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
								]}
							/>
						</Paper>
						<Fab
							style={{
								float: "right",
								marginTop: "-20%",
							}}
							size="medium"
							color="primary"
							aria-label="add"
							onClick={() => {
								handleClose();
							}}
						>
							<CloseIcon />
						</Fab>
					</div>
					{/* <Gifs
						refresh={props.refresh}
						userName={props.userName}
						complId={props.complId}
						msgs={props.msgs}
						close={handleClose}
					/> */}
				</Box>
			</Modal>
		</>
	);
}
