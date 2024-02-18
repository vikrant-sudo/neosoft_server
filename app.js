const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const Userdata = require('./model/Userdata')
app.use(cors())
app.use(bodyParser.json())




app.get('/userdata', async (req, res)=>{
     
    let result = await Userdata.find()
    .then(function( result){
        return res.send({message: 'User created successfully', record: result})
    })
    .catch(function (error){
        res.status(400).send({message: error.message})
    })
})
app.post('/userdata', async (req, res)=>{
    let userDetails = req.body
    let user = new Userdata({
        userId: userDetails.userId,
        id: userDetails.id,
        title: userDetails.title,
        body: userDetails.body
    })
    await user.save()
    .then(function( result){
        return res.send({message: 'User created successfully'})
    })
    .catch(function (error){
        res.status(400).send({message: error.message})
    })
})


const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/neosoft')
.then(function (result){
    app.listen(PORT, ()=>{
        console.log('server is running')
    })
})
.catch(function (error){
    console.log('error occurred while connecting to db ')
})