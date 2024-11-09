import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js';

const app = express();
app.use('/posts', postsRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const connection_url = 'mongodb+srv://javascript:javascript123@cluster0.clz2m.mongodb.net/Cluster0?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

// Remove useUnifiedTopology and useNewUrlParser
mongoose.connect(connection_url)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    
