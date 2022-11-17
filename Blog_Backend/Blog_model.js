const mongoose=require('mongoose')

const Blog=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }

});

module.exports=mongoose.model('Blog',Blog);