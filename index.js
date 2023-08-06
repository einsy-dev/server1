require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index')
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/', router);


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        await app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
    } catch (error) {
        console.log(error);
    }
}

start();
