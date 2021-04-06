const mongoose = require('mongoose');
const Users = require("./userModel");
const Schema =mongoose.Schema;
const post = new Schema({

    email:{type: String,required: true},

description:{type: String,required: true},
date: { type : Date, required: true},


}, {
    timestamps: true, discriminatorKey: 'role',
})
const postSchema = mongoose.model('post',post);
module.exports=postSchema;