var express = require('express')

var path = require('path')

var app = express()

var router1 = require('./routes/session.js')
var router2 = require('./routes/topic.js')

var bodyParser = require('body-parser')

var session = require('express-session')

var arttemplate = require('express-art-template')
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true	//无论是否使用session 我都默认直接给你分配一把钥匙
}))

app.use('/public/',express.static('./public/'))
app.engine('html',arttemplate)
app.set('views',path.join(__dirname,'./views/'))

app.use(router1)
app.use(router2)



app.listen(8081,()=>{
	console.log('blog server is running')
})


