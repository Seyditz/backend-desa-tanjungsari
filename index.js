const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const PostRoute = require('./routes/post');
const UserRoute = require('./routes/user');
const UmkmRoute = require('./routes/umkm');

mongoose.connect('mongodb+srv://chordan345:345345@tanjungsari-cluster1.8h7vbny.mongodb.net/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
	console.log(err);
});


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;



app.use('/posts', PostRoute);
app.use('/users', UserRoute);
app.use('/umkm', UmkmRoute);

db.once('open', () => {
	console.log('Database Connection Established');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
