// require("dotenv").config();
// const auth_user=require('./authentication')
const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const mongoose=require('mongoose')
const User=require('./models_reg')
const Blog=require('./Blog_model.js')
const jwt=require('jsonwebtoken')
// const multer=require('multer')



router.post('/register',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length>=1){
            return res.status(409).json({
                message:'user already exists with this email'
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        username:req.body.username,
                        email:req.body.email,
                        password: hash
                
                    })
                    user.save().then(result=>{
                        console.log(result)
                        res.status(201).json({
                            message:'user created'
                        })
                    }).catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            error:err
                        })
                    })
                    
                }
            })
        

        }

    })

})

router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth failed'
            })
        
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    console.log(err)
                    return res.status(401).json({
                        message:'Auth failed'})

                }
                if(result){
                    console.log('Success')
                    console.log(user)
                    const token =jwt.sign({
                        username:user[0].username
                    },'abcdefg',{
                        expiresIn:"1h"
                    })
                    const email=req.body.email
                    return res.status(200).json({message:'loggied in successfully',tokens:token,username:user[0].username})
                }
                return res.status(401).json({
                message:'Auth failed'})
                
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
router.post('/Blog_data',async(req,res)=>{
    const data_B=new Blog({
        title:req.body.Title,
        text:req.body.Text
    })
    try{
       const data=await data_B.save()
       res.json(data)
    }catch(err){
        res.send('some error occured')

    }
})

router.get('/fetch_blog',async(req,res)=>{
    try{
        const data=await Blog.find()
        res.json(data)
    }catch(err){
        res.send('error occured')
    }
})

module.exports=router