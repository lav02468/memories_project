import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts';
import { styled } from '@mui/material/styles';

// Define styled components instead
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
}));

const StyledMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
});

const Overlay = styled('div')({
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
});

const Overlay2 = styled('div')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
});

const Details = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
});

const CardContentStyled = styled(CardContent)({
    padding: '0 16px 16px 16px',
});

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    console.log('Post data:', post);

    if (!post) {
        return null;
    }

    return (
        <StyledCard>
            <StyledMedia
                image={post.selectedFile}
                title={post.title || 'Untitled'}
            />
            <Overlay>
                <Typography variant="h6">{post.creator || 'Unknown Creator'}</Typography>
                <Typography variant="body2">
                    {post.createdAt ? moment(post.createdAt).fromNow() : 'Just now'}
                </Typography>
            </Overlay>
            <Overlay2>
                <Button 
                    style={{ color: 'white' }} 
                    size="small" 
                    onClick={() => setCurrentId(post._id)}
                >
                    Edit
                </Button>
            </Overlay2>
            <Details>
                <Typography variant="body2" color="textSecondary">
                    {post.tags && post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </Details>
            <CardContentStyled>
                <Typography variant="body2" component="p">
                    {post.message}
                </Typography>
            </CardContentStyled>
            <CardActions disableSpacing>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount || 0}
                </Button>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => dispatch(deletePost(post._id))}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardActions>
        </StyledCard>
    );
};

export default Post;