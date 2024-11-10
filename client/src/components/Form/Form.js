import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Submitting post data:', postData); // Debug log
            await dispatch(createPost(postData));
            clear(); // Clear form after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
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
    };

    // ... rest of your form JSX
};

export default Form; 