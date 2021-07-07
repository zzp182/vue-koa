const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/dbs'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = () =>{
    mongoose.connect(db)
    let maxConnectTime = 0
   return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('**断开连接**')
            if(maxConnectTime<=3){
                maxConnectTime++
                mongoose.connect(db)
            }else{
                 reject()
                 throw new Error('数据库出现问题，程序无法搞定')
            }
        })

        mongoose.connection.on('error',(err)=>{
            console.log('**连接错误**')
            if(maxConnectTime<=3){
                maxConnectTime++
                mongoose.connect(db)
            }else{
                 reject(err)
                 throw new Error('数据库出现问题，程序无法搞定')
            }
        })

        mongoose.connection.on('connected',()=>{
            console.log('**连接成功**')
            resolve()
        })
   })

   
}