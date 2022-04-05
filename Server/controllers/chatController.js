const jwt = require("jsonwebtoken");
const io = require("socket.io")();

io.use(function (socket, next) {
	try {
		const token = socket.handshake.query.token;
		if (!token) return next(new Error("Authentication error"));
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return next(new Error("Authentication error"));
			socket.user = user;
			next();
		});
	} catch (err) {
		return next(new Error("Authentication error"));
	}
}).on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});
