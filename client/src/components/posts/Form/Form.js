import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../actions/posts';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
    },
}));

const StyledButton = styled(Button)({
    marginBottom: 10,
});

const Form = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
        console.log(postData);
    };

    return (
        <StyledPaper>
            <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth 
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth 
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth 
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                />
                <div>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <StyledButton 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                >
                    Submit
                </StyledButton>
            </StyledForm>
        </StyledPaper>
    );
}

export default Form;