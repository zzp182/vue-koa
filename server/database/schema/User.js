const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId    
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建用户表模型
const userSchema = new Schema({
    UserId : {type: ObjectId},
    userName: {unique:true,type: String},
    passWord: String,
    createAt: {type: Date,default:Date.now()},
    lastLoginAt: {type: Date,default:Date.now()}
})

userSchema.pre('save',function(next){
         bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
            if(err) return next(err)
            bcrypt.hash(this.passWord,salt,(err,hash)=>{
               if(err) return next(err)
               this.passWord = hash
               next()
            })
         })
})


//发布表模型
mongoose.model('User',userSchema)