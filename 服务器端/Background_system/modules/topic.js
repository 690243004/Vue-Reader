var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
var Scheme = mongoose.Schema

var topicSchema = new Scheme({
	title:{
		type:String,
		require:true
	},
	content:{
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
	last_time:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model('Topic',topicSchema)