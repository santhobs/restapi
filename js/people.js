var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var PeopleSchema = mongoose.Schema({

	fname:String,
	lname:String

});

var UserSchema = mongoose.Schema({

	username:String,
	password:String

});
UserSchema.methods.generateHase = function(password){
	 return bCrypt.hashSync(password, bCrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bCrypt.compareSync(password, this.password);

}
module.exports = mongoose.model('People', PeopleSchema);
module.exports = mongoose.model('User', UserSchema);