const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
        case 'LIKE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'DELETE':
            console.log('DELETE action received in reducer');
            console.log('Current posts:', posts);
            console.log('Payload ID:', action.payload);
            const filteredPosts = posts.filter((post) => post._id !== action.payload);
            console.log('Filtered posts:', filteredPosts);
            return filteredPosts;
        default:
            return posts;
    }
};

export default postsReducer;