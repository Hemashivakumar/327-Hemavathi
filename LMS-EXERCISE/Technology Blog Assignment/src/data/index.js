import mongoose from 'mongoose';


import '../models/Article.js';


const connectionStr = `mongodb://localhost:27017/Exercise`;


mongoose
    .connect( connectionStr )
    .then(() => {
        console.log( `connected to the DB` );
    })
    .catch(err => {
        console.log( err.message );
    });