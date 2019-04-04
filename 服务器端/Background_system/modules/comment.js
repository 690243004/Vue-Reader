var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },)
var Scheme = mongoose.Schema
var commentSchema = new Scheme({
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
    parentId:{
        type:String,
        require:true,
        default:0
    },
    bookId: {
        type:String,
        require:true,
    },
    avatar: {
        type:String,
        require:true,
    }
})
module.exports = mongoose.model('comment',commentSchema)