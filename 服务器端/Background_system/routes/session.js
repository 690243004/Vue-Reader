//注册 登录 退出

var express = require('express')

var router = express.Router()

var session = require('express-session')

var User = require('../modules/user')

var FeedBack = require('../modules/feedBack')

var Comment = require('../modules/comment')

var Topic = require('../modules/topic')

var md5 = require('blueimp-md5')

var mongoose = require('mongoose');

const errm = 'server error'

//首页
router.get('/',(req,res)=>{
	var user  = req.session.user
	//查询topic中的数据
	Topic.find((err,data)=>{
		if(err){
			return res.status(500).json({err_code:500,message:err.message})
		}
		res.render('./_layouts/home.html',{user:user,topicList:data})
	})
})

//登录页面
router.get('/login.html',(req,res)=>{
	res.render('./login.html')
})

//注册页面
router.get('/register.html',(req,res)=>{
	res.render('./register.html')
})

//注册
router.post('/register',(req,res)=>{
	//1.获取表单提交的数据u
	var body = req.body
	//对密码进行重复的md5加密
	body.password = md5(md5(body.password))
	//2.操作数据库
	User.findOne({
		$or:[
			{email: body.email},
			{username:body.username}
		]		
	},(err,data)=>{
		if(err){
			return res.status(500).json({error:errm,err_code:2})
		}
		if(data){
			return res.status(200).json({message:'email or name is already existing',err_code:1})
		}else{
			var user = new User(body)
			user.save(function(err,result){
				if(err){
					return res.status(500).json({error:errm,err_code:2})
				}
				req.session.user = result
				req.session.islogin = true
				return res.status(200).send(JSON.stringify({
				message:'ok',
				err_code:0
				}));
			})
			req.session.user = user
		}
	})
		// 判断用户是否存在
		// 如果已存在，不允许注册
	// 如果不存在，注册新建用户
})
//登录
router.post('/login',(req,res)=>{
	var body = req.body
	User.findOne({
			email:body.email,
			password:md5(md5(body.password))
		},(err,user)=>{
			if(err)	return res.status(500).json({err_code:500,message:err.message})
			if(!user)	return res.status(200).json({
				err_code:1,
				message:'email or password is invaild'
			})
			user.password = ''
			req.session.user = user
			return res.status(200).json({
				user,
				err_code:0,
				message:'ok'
			})
	})
})

/* .findByIdAndUpdate(id, update, options, callback) // executes
A.findByIdAndUpdate(id, update, options)  // returns Query
A.findByIdAndUpdate(id, update, callback) // executes
A.findByIdAndUpdate(id, update)           // returns Query
A.findByIdAndUpdate()                     // returns Query


id：指定_id的值；update：需要修改的数据；options控制选项；callback回调函数。
options有以下选项：
　　new： bool - 默认为false。返回修改后的数据。
　　upsert： bool - 默认为false。如果不存在则创建记录。
　　runValidators： 如果值为true，执行Validation验证。
　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
　　sort： 如果有多个查询条件，按顺序进行查询更新。
　　select： 设置数据的返回。 */

// 图片上传
router.post('/uploadAvatar',(req,res)=>{
	//1.获取表单提交的数据u
	var body = req.body
	//2.操作数据库
	User.findByIdAndUpdate(body._id,{
		avatar:body.avatar
	},{new:true},function(err,result){
		if(err){
			return res.status(500).json({
				err_code:500,
				message:err,
			})
		}else{
			console.log(result)
			return res.status(200).json({
				user:result,
				err_code:0,
				message:'ok'
			})
		}
	})
})

// 建议反馈
router.post('/feedBack',(req,res)=>{
	//1.获取表单提交的数据u
	var body = req.body
	var content = body.content||""
	var userId = body.userId||""
	var username = body.username||""
	var object = new FeedBack({
		content,username,userId
	})
	object.save(function(err,result){
		if(err) {
			return res.status(500).json({
				err_code:500,
				message:err,
			})
		} else {
			return res.status(200).json({
				user:result,
				err_code:0,
				message:'ok'
			})
		}
	})
})

// 点击收藏
router.post('/collect',(req,res)=>{
	var body = req.body
	User.findByIdAndUpdate(body._id,{
		collect:body.collect
	},{new:true},function(err,result){
		if(err){
			return res.status(500).json({
				err_code:500,
				message:err,
			})
		}else{
			return res.status(200).json({
				user:result,
				err_code:0,
				message:'ok'
			})
		}
	})
})

// 获取个人信息
router.post('/userDetail',(req,res)=>{
	var body = req.body
	var _id = body._id
	User.findOne({_id},function(err,result){
	if(err){
			return res.status(500).json({
				err_code:500,
				message:err,
			})
		}else{
			return res.status(200).json({
				user:result,
				err_code:0,
				message:'ok'
			})
	}
	})
})

// 点评
router.post('/review',(req,res)=>{
	var body = req.body
	var userId = body.userId
	var username = body.username
	var content = body.content
	var bookId = body.bookId
	var avatar = body.avatar
	var parentId = body.parentId
	console.log(body)
	var comment = new Comment({
		userId,content,userId,username,bookId,avatar,parentId
	})
	comment.save(function(err,result){
		if(err){
			return res.status(500).json({error:errm,err_code:2})
		}
		return res.status(200).send(JSON.stringify({
			message:'ok',
			err_code:0
		}));
		
	})
})

// 获取点评列表
router.post('/reviewList',(req,res)=>{
	var body = req.body
	var bookId = body.bookId
	var parentId = body.parentId
	Comment.find({bookId,parentId:parentId||0},function(err,result){
		console.log(result)
		if(err){
			return res.status(500).json({error:errm,err_code:2})
		}else{
			return res.status(200).send(JSON.stringify({
				message:'ok',
				err_code:0,
				data:result
			}));
		}
	})
})
module.exports = router