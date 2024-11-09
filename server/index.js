import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use('/posts', postsRoutes);

// MongoDB Connection URL
const connection_url = 'mongodb+srv://javascript:javascript123@cluster0.clz2m.mongodb.net/Cluster0?retryWrites=true&w=majority';

// Try different ports if the default is in use
const tryPort = (startPort) => {
    const server = app.listen(startPort)
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${startPort} is busy, trying ${startPort + 1}`);
                server.close();
                tryPort(startPort + 1);
            }
        })
        .on('listening', () => {
            const port = server.address().port;
            console.log(`Server successfully running on port: ${port}`);
        });
};

// Connect to MongoDB and Start Server
mongoose.connect(connection_url)
    .then(() => {
        console.log('Connected to MongoDB');
        tryPort(5000);
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

    
