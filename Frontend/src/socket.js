import io from "socket.io-client";
export const socket = io.connect("ws://localhost:5000");
