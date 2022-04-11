import mongoose from 'mongoose';
import commentSchema from './Comment.js';


const articleSchema = new mongoose.Schema({
    comments: {
        type: [ commentSchema ],
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    abstract: {
        type: String,
        required: true,
        unique:true
    },
    body: {
        type: String,
        required: true,
        unique:true
    },
    imageUrl: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now
    }
});


mongoose.model( 'Article', articleSchema );