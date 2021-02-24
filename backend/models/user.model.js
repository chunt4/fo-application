const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// userSchema.pre('save', function(next){
//     const user = this;

//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//     });
// })

// userSchema.methods.checkPassword = function(password, params) {
//     bcrypt.compare(password, this.password, params);
// }

module.exports = mongoose.model('user', userSchema);