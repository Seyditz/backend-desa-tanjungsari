const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
	{
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
	},
	{ timestamps: true }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);
module.exports = User;
