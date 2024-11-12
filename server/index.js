import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js';

const app = express();

// Debugging middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// CORS configuration
app.use(cors());

// Body parser middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 5001; // Using port 5001

mongoose.connect('mongodb+srv://javascript:javascript123@cluster0.clz2m.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log('Connected to MongoDB');
        });
    })
    .catch((error) => console.log(error.message));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

    
