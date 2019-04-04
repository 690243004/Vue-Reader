var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var Scheme = mongoose.Schema

var userSchema = new Scheme({
	email:{
		type:String,
		require:true
	},
	username:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	create_time:{
		type:Date,
		default:Date.now
	},
	last_time:{
		type:Date,
		default:Date.now
	},
	avatar: {
		type:String,
		default:''
	},
	bio: {
		type:String,
		default:''
	},
	gender:{
		type:Number,
		enum:[-1,0,1],
		default:-1
	},
	birthday:{
		type:Date,
	},
	status:{
		type:Number,
		//是否可以评论 0没有评论权限 1不可以平评论 2不可以登录
		enum:[0,1,2],
		default:0
	},
	collect: {
		type:Array,
		default:[]
	}
})

module.exports = mongoose.model('User',userSchema)