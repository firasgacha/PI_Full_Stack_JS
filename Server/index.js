require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const Complaint = require("./routes/Complaint");
var productsRouter = require("./routes/products");
var ratingsRouter = require("./routes/ratings");
var feedbacksRouter = require("./routes/feedbacks");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const chatService = require("./services/chat.service");

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles: true
// }))

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/upload"));
app.use("/products", productsRouter);
app.use("/ratings", ratingsRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/complaint", Complaint);
app.use("/store", require("./routes/store.router"));
app.use("/chat", require("./routes/chat.router"));

//Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connected to mongodb");
	}
);

io.on("connect", (socket) => {
	socket.on("joinRoom", ({ userId, room }) => {
		if (userId) {
			const user = chatService.userJoin(socket.id, userId, room);
			socket.join(user.room);
			console.log(`${userId} has joined ${user.room}`);
		}
	});

	// Listen for chatMessage
	socket.on("chatMessage", (msg) => {
		const user = chatService.getCurrentUser(socket.id);
		console.log(msg);
		const message = {
			content: msg.content,
			image: msg.image,
			sender: user.userId,
			timestamp: Date.now(),
		};
		chatService.saveMessage(user, message);
		io.to(user.room).emit("message", message);
	});

	// Runs when client disconnects
	socket.on("leaveRoom", () => {
		console.log("Client has Left");
		chatService.userLeave(socket.id);
	});

	// Runs when client disconnects
	socket.on("disconnect", () => {
		chatService.userLeave(socket.id);
	});
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
