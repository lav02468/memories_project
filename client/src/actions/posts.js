import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.error(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.error(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.error(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        console.log('Attempting to delete post:', id); // Debug log
        const response = await api.deletePost(id);
        console.log('Server response:', response); // Debug log
        
        if (response.status === 200) {
            dispatch({ type: 'DELETE', payload: id });
            console.log('Post deleted successfully, state updated'); // Debug log
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.error(error.message);
    }
};