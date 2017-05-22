var mongoose= require('mongoose');


// my clientSchema to display or add  data in table according to this
var clientSchema = new mongoose.Schema({
    parentname: {
        type: String,
        required:'Name is required'
    },
    phone:{
        type:String,
        required:'Phone is required'
    },
    email:{
        type: String
    },
    campername:{
        type:String,
        required:'Camper Name is required'
    },
    notes:{
        type:String
    },
    medical:{
        type:String,
        required:'Medical is required'
    },
    code:{
        type:Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Client', clientSchema);
