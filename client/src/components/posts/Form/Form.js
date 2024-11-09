import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    return (
        <StyledPaper>
            <StyledForm autoComplete="off" noValidate>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth 
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth 
                />
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