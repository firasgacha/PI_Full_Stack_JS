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
const http = require("http");
const path = require("path");
const server = express();
const app = http.createServer(server);
const socketio = require("socket.io");
const io = socketio(app);
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

io.on("connection", (socket) => {
	socket.on("joinRoom", ({ userId, room }) => {
		const user = chatService.userJoin(socket.id, userId, room);
		socket.join(user.room);
		console.log(`${user.userId} has joined ${user.room}`);
	});

	// Listen for chatMessage
	socket.on("chatMessage", (msg) => {
		const user = chatService.getCurrentUser(socket.id);
		chatService.saveMessage(user, msg);
		io.to(user.room).emit("message", formatMessage(user.userId, msg));
	});

	// Runs when client disconnects
	socket.on("disconnect", () => {
		chatService.userLeave(socket.id);
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
