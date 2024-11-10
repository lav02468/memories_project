import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';

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

    const renderTags = () => {
        if (!post.tags) return '';
        if (typeof post.tags === 'string') {
            return post.tags.split(',').map((tag) => `#${tag.trim()} `).join(' ');
        }
        if (Array.isArray(post.tags)) {
            return post.tags.map((tag) => `#${tag.trim()} `).join(' ');
        }
        return '';
    };

    return (
        <StyledCard>
            {post.selectedFile && (
                <StyledMedia
                    image={post.selectedFile}
                    title={post.title || 'Untitled'}
                />
            )}
            <CardContent>
                <Typography variant="h6">{post.creator || 'Unknown Creator'}</Typography>
                <Typography variant="body2">
                    {post.createdAt ? moment(post.createdAt).fromNow() : 'Just now'}
                </Typography>
                <Button
                    style={{ position: 'absolute', top: '20px', right: '20px' }}
                    size="small"
                    onClick={() => console.log('Edit clicked')}
                >
                    <MoreHorizIcon fontSize="medium" />
                </Button>
                <Typography variant="body2" color="textSecondary">
                    {renderTags()}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {post.title || 'Untitled'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message || 'No message'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => console.log('Like clicked')}
                    startIcon={<ThumbUpAltIcon />}
                >
                    Like {post.likeCount || 0}
                </Button>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => console.log('Delete clicked')}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardActions>
        </StyledCard>
    );
}

export default Post;