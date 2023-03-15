const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new Schema(
	{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
	},
	{ timestamps: true }
);

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
