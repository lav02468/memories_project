import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Post from './Post/post';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    
    if (!Array.isArray(posts)) {
        return <CircularProgress />;
    }

    if (posts.length === 0) {
        return (
            <Typography variant="h6" align="center">
                No posts found. Create one!
            </Typography>
        );
    }

    return (
        <Grid container spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} />
                </Grid>
            ))}
        </Grid>
    );
}

export default Posts;