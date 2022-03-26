const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Complaint = require("./routes/Complaint");
const UserRoute = require("./routes/User");
//upload image //////////////////////////////////
const multer = require('multer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:3000';
app.use(cors()); 

const imageUploadPath = 'C:/Users/Firas GACHA/Desktop/PI_Full_Stack_JS/Frontend/uploaded_files';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
  console.log('POST request received to /image-upload.');
  console.log('Axios POST body: ', req.body);
  res.send('POST request recieved on server to /image-upload.');
})

// const port = 4000;
// app.listen(port, process.env.IP, function(){
//   console.log(`Server is running on port ${port}`);
// });


//upload image //////////////////////////////////

app.use(express.json({limit: '25mb'}));



app.use(express.json())
const DB = 'mongodb+srv://Ahmedjelassi:Langue123@pidev.3zlxb.mongodb.net/Pidev?retryWrites=true&w=majority'

mongoose.connect(DB,{useNewUrlParser: true,
    useUnifiedTopology: true }).then(()=>{
    console.log('connection successfull')
}).catch((error)=>console.log(error))

// Use Routes
app.use('/complaint',Complaint);
app.use('/user', UserRoute);




app.post('/api/register', async (req, res) => {

    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password,10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            address : req.body.address,
            image : req.body.image,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    }
    catch(err){
        console.log(err)
        res.json({ status: 'error', error:'duplicate email' })
    }
} )

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email})
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(!user){
        return { status: 'error', error: 'invalid login'}
    }
    if (isPasswordValid){

        const token = jwt.sign({
            email: user.email,
            name: user.name,

        },'secret123')

        return res.json({ status: 'ok', user : token })
    }
    else{
        return res.json({ status: 'error', user : false })

    }


} )
app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {

        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email:email})
        return res.json({ status:'ok', quote : user.quote})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})

    }

} )

app.get('/api/user', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email:email})
        return res.json({ status:'ok',id : user.id,name : user.name , address : user.address})

    }catch(error){
        console.log(error)
        res.json({status:'error', error: 'invalid token'})

    }

} )


app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {

        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({ email:email},{ $set: {
                quote : req.body.quote
            }})
        return res.json({ status:'ok'})

    }catch(error){
        console.log(error)
        return res.json({status:'error', error: 'invalid token'})

    }

} )

app.listen(1337, () => {
    console.log('Server started on 1337')
})



