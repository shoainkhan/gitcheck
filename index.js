require('dotenv').config();
// const mongoString = process.env.DATABASE_URL
const mongoString = 'mongodb://localhost:27017/myDb';
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;


app.use('/api', routes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
console.log('TESTE')
app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})