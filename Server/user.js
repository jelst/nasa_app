var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username: String,
    password: String,
    vaid: String
});

module.exports = mongoose.model('User', UserSchema);