/**
 * Created by Manoj on 04-Apr-17.
 */

//lfacebook login and local

var mongoose=require('mongoose');
var plm = require('passport-local-mongoose');

var findorcreate=require('mongoose-findorcreate');

var userSchema = new mongoose.Schema({
    facebookId:String
});

userSchema.plugin(plm);

module.exports = mongoose.model('peoples', userSchema);