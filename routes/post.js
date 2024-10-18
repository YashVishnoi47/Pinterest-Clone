const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
