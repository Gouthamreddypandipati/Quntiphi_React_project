// modules
const express=require('express')
const mongoos=require('mongoose')
const url='mongodb://localhost/Blog_data'
const app=express()
//
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//
// connecting to mangodb through mongoose which is frontend for mongodb
mongoos.connect(url)
// get the functionalites
const con=mongoos.connection
con.on('open',()=>{
    console.log('connected')
})
// use json
app.use(express.json())
// getting the routing file
const routing=require('./router.js')

// if u get request with url start with '/user' forword to routing file
app.use('/user',routing)


app.listen(9000,()=>{
    console.log('started')
})