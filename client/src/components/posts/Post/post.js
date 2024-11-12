import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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

const StyledLikeButton = styled(Button)(({ theme }) => ({
    transition: 'transform 0.2s',
    '&:active': {
        transform: 'scale(0.95)',
    },
}));

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likeCount || 0);

    const handleLike = async () => {
        try {
            await dispatch(likePost(post._id));
            setLikeCount((prevCount) => prevCount + 1);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            console.log('Starting delete process for post:', post._id); // Debug log
            await dispatch(deletePost(post._id));
            setOpenDialog(false);
            console.log('Delete process completed'); // Debug log
        } catch (error) {
            console.error('Error in handleDeleteConfirm:', error);
            setOpenDialog(false);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDialog(false);
    };

    if (!post) {
        return null;
    }

    return (
        <>
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
                    <StyledLikeButton 
                        size="small" 
                        color="primary" 
                        onClick={handleLike}
                        startIcon={<ThumbUpAltIcon />}
                    >
                        Like {likeCount}
                    </StyledLikeButton>
                    <Button 
                        size="small" 
                        color="secondary" 
                        onClick={handleDeleteClick}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </CardActions>
            </StyledCard>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    {"Delete Post?"}
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this post? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm} 
                        color="secondary" 
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Post;