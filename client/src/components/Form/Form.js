import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (posts) setPostData(posts);
    }, [posts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            try {
                console.log('Submitting post data:', postData); // Debug log
                await dispatch(createPost(postData)); // Only call createPost once
                clear(); // Clear form after successful submission
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    const clear = () => {
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
        setCurrentId(null); // Reset currentId after clearing
    };

    const handleEdit = (id) => {
        setCurrentId(id); // Set the currentId to the post's ID
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Your form fields go here */}
            <input
                type="text"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                placeholder="Title"
            />
            {/* Add other fields similarly */}
            <button type="submit">{currentId ? 'Update' : 'Create'} Post</button>
            <button onClick={clear}>Clear</button>
        </form>
    );
};

export default Form;