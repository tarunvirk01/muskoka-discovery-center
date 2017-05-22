var mongoose= require('mongoose');


// my staffSchema to display or add  data in table according to this
var staffSchema = new mongoose.Schema({
	staffname: {
		type: String,
		required:'FirstName is required'
	},
  stafflastname:{
  	type:String,
  	required:'LastName is required'
  },
  phone:{
  	type: Number,
  	required:'Phone is required'
  },
  role:{
  	type:String,
  	required:'Role is required'
  }

});

module.exports = mongoose.model('Staff', staffSchema);
