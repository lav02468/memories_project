import React from 'react';
import { Grid } from '@mui/material';
import Post from './Post/post';

const Posts = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Post />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Post />
            </Grid>
        </Grid>
    );
}

export default Posts;