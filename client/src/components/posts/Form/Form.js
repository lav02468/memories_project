import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../../actions/posts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledForm = styled('form')({
  width: '100%', // Fix IE 11 issue.
  marginTop: '20px',
});

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if (post) {
      setPostData({
        creator: post.creator || '',
        title: post.title || '',
        message: post.message || '',
        tags: post.tags ? post.tags.join(', ') : '',
        selectedFile: post.selectedFile || ''
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      try {
        console.log('Submitting post data:', postData); // Debug log
        await dispatch(createPost(postData));
        clear(); // Clear form after successful submission
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
    setCurrentId(null); // Reset currentId after clearing
  };

  return (
    <StyledPaper elevation={6}>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Form Title */}
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {currentId ? 'Editing' : 'Creating'} a Memory
            </Typography>
          </Grid>

          {/* Creator Field */}
          <Grid item xs={12}>
            <TextField 
              name="creator" 
              variant="outlined" 
              label="Creator" 
              fullWidth 
              value={postData.creator}
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            />
          </Grid>

          {/* Title Field */}
          <Grid item xs={12}>
            <TextField 
              name="title" 
              variant="outlined" 
              label="Title" 
              fullWidth 
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
          </Grid>

          {/* Message Field */}
          <Grid item xs={12}>
            <TextField 
              name="message" 
              variant="outlined" 
              label="Message" 
              fullWidth 
              multiline
              minRows={4}
              value={postData.message}
              onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            />
          </Grid>

          {/* Tags Field */}
          <Grid item xs={12}>
            <TextField 
              name="tags" 
              variant="outlined" 
              label="Tags (comma separated)" 
              fullWidth 
              value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
            />
          </Grid>

          {/* File Upload */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              />
              {postData.selectedFile && (
                <Box ml={2}>
                  <img src={postData.selectedFile} alt="Selected" style={{ width: '100px' }} />
                </Box>
              )}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              type="submit" 
              fullWidth
            >
              {currentId ? 'Update' : 'Create'} Post
            </Button>
          </Grid>

          {/* Clear Button */}
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="small" 
              onClick={clear} 
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
    </StyledPaper>
  );
};

export default Form;