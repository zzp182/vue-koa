const Koa = require('koa')
const app = new Koa()
const {connect , initSchemas} = require('./database/init')
const mongoose = require('mongoose')


;(async ()=>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'zzp1',passWord:'123456'})
    oneUser.save().then(()=>{
        console.log('写入成功')
    })
    let user = await User.findOne({}).exec()
    console.log('---------------')
    console.log(user)
    console.log('---------------')
})()


app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})