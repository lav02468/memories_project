import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('App');
});
// Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server running on port ${PORT}');
});