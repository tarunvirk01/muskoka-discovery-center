var mongoose= require('mongoose');


// my clientSchema to display or add  data in table according to this
var priceSchema = new mongoose.Schema({
   cname:{
       type:String,
       required:'Process is required'
   },
   details:{
       type:String,
       required:'Phone is required'
   },
   price: {
       type:Number,
       required: 'Camper Name is Requuired'
   }
});

module.exports = mongoose.model('Price', priceSchema);
