const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const homeCarouselSchema = new Schema(
	{
        images: {
            type: Array,
            required: true
        },
	},
	{ timestamps: true }
);

homeCarouselSchema.plugin(mongoosePaginate);

const HomeCarousel = mongoose.model('HomeCarousel', homeCarouselSchema);
module.exports = HomeCarousel;
