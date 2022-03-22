const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Complaint = require("./routes/Complaint");




app.use(express.json({limit: '25mb'}));


app.use(cors())
app.use(express.json())
const DB = 'mongodb+srv://Ahmedjelassi:Langue123@pidev.3zlxb.mongodb.net/Pidev?retryWrites=true&w=majority'

mongoose.connect(DB,{useNewUrlParser: true,
    useUnifiedTopology: true }).then(()=>{
    console.log('connection successfull')
}).catch((error)=>console.log(error))

// Use Routes
app.use('/complaint',Complaint);





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