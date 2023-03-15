const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const UmkmSchema = new Schema(
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
            type: Array,
            required: true
        },
        category: {
            type: String,
            required: true
        },
	},
	{ timestamps: true }
);

UmkmSchema.plugin(mongoosePaginate);

const Umkm = mongoose.model('Umkm', UmkmSchema);
module.exports = Umkm;
