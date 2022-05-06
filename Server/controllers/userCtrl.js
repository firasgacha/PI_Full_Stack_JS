const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const {google} = require('googleapis')
const fetch = require('node-fetch')
const mongoose = require("mongoose");
const {OAuth2} = google.auth
const User = mongoose.model("Users")

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID )


const { CLIENT_URL } = process.env;

const userCtrl = {
	register: async (req, res) => {
		try {
			const {
				name,
				email,
				password,
				address,
				city,
				state,
				zip,
				country,
				telephone,
			} = req.body;
			if (
				!name ||
				!email ||
				!password ||
				!address ||
				!city ||
				!state ||
				!zip ||
				!country ||
				!telephone
			)
				return res.status(400).json({ msg: "Please fill in all the fields." });

			if (!validateEmail(email))
				return res.status(400).json({ msg: "Invalid email." });

			const user = await Users.findOne({ email });
			if (user)
				return res.status(400).json({ msg: "This email already exists." });

			if (password.length < 6)
				return res
					.status(400)
					.json({ msg: "Password must be at least 6 characters." });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = {
				name,
				email,
				password: passwordHash,
				address,
				city,
				state,
				zip,
				country,
				telephone,
			};

			const activation_token = createActivationToken(newUser);

			const url = `${CLIENT_URL}/user/activate/${activation_token}`;
			sendMail(email, url, "Verify your email address");

			res.json({
				msg: "Register Success! Please activate your email to start.",
			});
		} catch (err) {
			res.status(500).json({
				msg: err.message,
			});
		}
	},
	activeEmail: async (req, res) => {
		try {
			const { activation_token } = req.body;
			const user = jwt.verify(
				activation_token,
				process.env.ACTIVATION_TOKEN_SECRET
			);

			const {
				name,
				email,
				password,
				address,
				city,
				state,
				zip,
				country,
				telephone,
			} = user;
			const check = await Users.findOne({ email });
			if (check)
				return res.status(400).json({ msg: "this email already exists." });

			const newUser = new Users({
				name,
				email,
				password,
				address,
				city,
				state,
				zip,
				country,
				telephone,
			});
			await newUser.save();

			res.json({ msg: "Account has been activated" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "this email does not exist" });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: "Password is incorrect" });

			console.log(user);
			const refresh_token = createRefreshToken({ id: user._id });
			res.cookie("refreshtoken", refresh_token, {
				httpOnly: true,
				path: "/user/refresh_token",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.json({ msg: "Login success!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getAccessToken: (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			if (!rf_token) return res.status(400).json({ msg: "Please login" });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(400).json({ msg: "Please login" });
				const access_token = createAccessToken({ id: user.id });
				res.json({ access_token });

				console.log(user);
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "this email does not exist" });

			const access_token = createAccessToken({ id: user._id });
			const url = `${CLIENT_URL}/user/reset/${access_token}`;

			sendMail(email, url, "Reset your password");
			res.json({ msg: "Re-send the password, please check your email." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const { password } = req.body;
			console.log(password);
			const passwordHash = await bcrypt.hash(password, 12);

			await Users.findOneAndUpdate(
				{ _id: req.user.id },
				{
					password: passwordHash,
				}
			);

			res.json({ msg: "Password successfully changed" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getUserInfor: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id).select("-password");

			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getUsersAllinfo: async (req, res) => {
		try {
			let query = Users.find();

			const page = parseInt(req.query.page) || 1;
			const pageSize = parseInt(req.query.pageSize) || 3;
			const skip = (page - 1) * pageSize;
			const total= await Users.countDocuments();

			const pages = Math.ceil(total/ pageSize);

			query = query.skip(skip).limit(pageSize);
			if(page > pages){
				res.status(404).json({
					status: "fail",
					message: "Page not found",
				})
			}

			const result = await query;
			res.status(200).json({
				status: "success",
				count: result.length,
				page,
				pages,
				data: result
			})

			//const users = await Users.find().select("-password");
			//res.json({total: users.length, users});
		} catch (err) {
			//return res.status(500).json({ msg: err.message });
			console.log(err);
			res.status(500).json({
				status: "error",
				msg: "Server Error"
			})
		}
	},
	getUsersAllinfoo: async (req, res) => {
		try {
			const users = await Users.find().select("-password");
			res.json(users);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
			return res.json({ msg: "Logged out" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateUser: async (req, res) => {
		try {
			const { name, avatar, city, address, telephone, state, zip } = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.user.id },
				{
					name,
					avatar,
					city,
					address,
					telephone,
					state,
					zip,
				}
			);
			res.json({ msg: "Update Success !" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	updateUsersRole: async (req, res) => {
		try {
			const { role } = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.params.id },
				{
					role,
				}
			);
			res.json({ msg: "Update Success !" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteUser: async (req, res) => {
		try {
			await Users.findByIdAndDelete(req.params.id);
			res.json({ msg: "Deleted Successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	googleLogin: async (req, res) => {
		try {
			const {tokenId} = req.body

			const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})

			const {email_verified, email, name, picture} = verify.payload

			const password = email + process.env.GOOGLE_SECRET

			const passwordHash = await bcrypt.hash(password, 12)

			if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

			const user = await Users.findOne({email})

			if(user){
				const refresh_token = createRefreshToken({id: user._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})

				res.json({msg: "Login success!"})
			}else{
				const newUser = new Users({
					name, email, password: passwordHash, avatar: picture,country:"", telephone: "", city: "", address: "", state: "", zip: ""
				})

				await newUser.save()

				const refresh_token = createRefreshToken({id: newUser._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})

				res.json({msg: "Login success!"})
			}


		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
	facebookLogin: async (req, res) => {
		try {
			const {accessToken, userID} = req.body

			const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

			const data = await fetch(URL).then(res => res.json()).then(res => {return res})

			const {email, name, picture} = data

			const password = email + process.env.FACEBOOK_SECRET

			const passwordHash = await bcrypt.hash(password, 12)

			const user = await Users.findOne({email})

			if(user){
				const refresh_token = createRefreshToken({id: user._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})

				res.json({msg: "Login success!"})
			}else{
				const newUser = new Users({
					name, email, password: passwordHash, avatar: picture.data.url
				})

				await newUser.save()

				const refresh_token = createRefreshToken({id: newUser._id})
				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7*24*60*60*1000 // 7 days
				})

				res.json({msg: "Login success!"})
			}


		} catch (err) {
			return res.status(500).json({msg: err.message})
		}
	},
};

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: "5m",
	});
};
const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};
const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};

module.exports = userCtrl;
