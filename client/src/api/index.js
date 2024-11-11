import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001',
});

// Debug interceptor
API.interceptors.request.use((req) => {
    console.log('Outgoing Request:', {
        url: req.url,
        method: req.method,
        data: req.data,
        headers: req.headers
    });
    return req;
});

API.interceptors.response.use(
    (response) => {
        console.log('Response received:', response);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            message: error.message,
            response: error.response,
            request: error.request
        });
        return Promise.reject(error);
    }
);

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);