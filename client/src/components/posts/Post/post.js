import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
});

const StyledMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
});

const Post = ({ post }) => {
    console.log('Post data:', post);

    if (!post) {
        return (
            <StyledCard>
                <CardContent>
                    <Typography variant="h6">Loading...</Typography>
                </CardContent>
            </StyledCard>
        );
    }

    return (
        <StyledCard>
            {post.selectedFile && (
                <StyledMedia
                    image={post.selectedFile}
                    title={post.title || 'Untitled'}
                />
            )}
            <CardContent>
                <Typography variant="h6">{post.title || 'Untitled'}</Typography>
                <Typography variant="body2">{post.message || 'No description'}</Typography>
                <Typography variant="body2">Created by: {post.creator || 'Unknown'}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => console.log('Like clicked')}>
                    Like {post.likeCount || 0}
                </Button>
                <Button size="small" color="primary" onClick={() => console.log('Delete clicked')}>
                    Delete
                </Button>
            </CardActions>
        </StyledCard>
    );
}

export default Post;