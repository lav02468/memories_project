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

const Post = () => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6">Post Title</Typography>
                <Typography variant="body2">Post Description</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Like</Button>
                <Button size="small" color="primary">Delete</Button>
            </CardActions>
        </StyledCard>
    );
}

export default Post;