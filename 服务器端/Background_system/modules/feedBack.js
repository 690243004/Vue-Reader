var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var Scheme = mongoose.Schema
var feedBackSchema = new Scheme({
    userId:{
		type:String,
		require:true
	},
    username:{
		type:String,
		require:true
    },
    create_time:{
		type:Date,
		default:Date.now
    },
    content:{
		type:String,
		require:true
    },
})
module.exports = mongoose.model('feedBack',feedBackSchema)