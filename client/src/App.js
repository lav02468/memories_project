import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Posts from './components/posts/Posts';
import Form from './components/posts/Form/Form';
import memories from './images/memories.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 50px',
}));

const StyledTypography = styled(Typography)({
  color: 'rgba(0,183,255, 1)',
});

const StyledImage = styled('img')({
  marginLeft: '15px',
  height: '60px',
});

const App = () => {
    return (
        <Container maxWidth="lg">
            <StyledAppBar position="static" color="inherit">
                <StyledTypography variant="h2" align="center">Memories</StyledTypography>
                <StyledImage src={memories} alt="memories" />
            </StyledAppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;