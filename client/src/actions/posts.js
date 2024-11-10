import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        console.log('Fetching posts...');
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        console.log('Creating post:', post);
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
        return data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};