//新建话题 删除话题 修改话题 查看话题列表
var express = require('express')

var router = express.Router()

var session = require('express-session')

var User = require('../modules/user')

var Topic = require('../modules/topic')

var md5 = require('blueimp-md5')

var mongoose = require('mongoose');

const errm = 'server error'

//留言详情
router.get('/detail',(req,res)=>{
	//获取id
	var id = req.query.id.replace(/\"/g,'')
	id?Topic.findById(mongoose.Types.ObjectId(id),function(err,data){
		err?res.render('./_layouts/404.html'):(data?res.render('./_layouts/detail.html',{data:data}):res.render('./_layouts/404.html'))
	}):res.render('./_layouts/404.html')
})

//发布留言
router.get('/publish',(req,res)=>{
	//进行校验
	var body = req.query
	// 1校验失败 0校验成功返回
	if(body.title===''||body.content==='')	return res.status(200).json({err_code:1,message:'Sorry，Title or Content must not null'})
	//校验成功
	//取出当前session 的username
	var topic = new Topic({title:body.title,content:body.content,username:req.session.user.username})
	topic.save((err,ret)=>{
		return err?res.status(200).json({err_code:1,message:err.message}):res.status(200).json({err_code:1,message:"publish success"})
	})
})


module.exports = router