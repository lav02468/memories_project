import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        console.log('Fetching posts...');
        const { data } = await api.fetchPosts();
        console.log('Fetched posts:', data);
        
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.error('Error fetching posts:', error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
};
    
