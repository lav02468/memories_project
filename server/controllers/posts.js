import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log('Retrieved posts:', postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        console.error('Error in getPosts:', error);
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    console.log('Received post data:', post);

    try {
        const newPost = new PostMessage(post);
        await newPost.save();
        console.log('Created new post:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in createPost:', error);
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id, 
            { likeCount: (post.likeCount || 0) + 1 }, 
            { new: true }
        );
        
        res.json(updatedPost);
    } catch (error) {
        console.error('Error in likePost:', error);
        res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No post with that id');
        }

        await PostMessage.findByIdAndDelete(id);
        
        console.log('Post deleted successfully:', id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in deletePost:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};
