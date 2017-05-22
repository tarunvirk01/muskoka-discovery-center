var mongoose= require('mongoose');


// my clientSchema to display or add  data in table according to this
var camperSchema = new mongoose.Schema({
    process: {
        type: String,
        required: true
    },
    camper: {
        type:String,
        required: 'Camper Name is Required'
    },
   code:{
       type:Number,
       required:'Code is required'
   },
   created_at:{
       type: Date,
       required: true,
       default: Date.now
   }
});

module.exports = mongoose.model('Camper', camperSchema);
