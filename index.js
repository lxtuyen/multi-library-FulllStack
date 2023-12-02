import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import libraryRoute from './routes/library.js';
import usersControlle from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import followedRoute from './routes/followed.js';
import historyRoute from './routes/history.js';
import adminRoute from './routes/admin.js';
import messageRoute from './routes/message.js';
import contentRoute from './routes/content.js';

dotenv.config();
const app = express();
const port =  8000;
const corsOption ={
    origin:true,
    credentials: true
}

// databased connect
mongoose.set('strictQuery', false);
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Thành công');
    } catch (err) {
        console.log(err);
    }
}

// middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/books', libraryRoute)
app.use('/api/v1/users', usersControlle)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/followed', followedRoute)
app.use('/api/v1/history', historyRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/content', contentRoute)

app.listen(port, ()=>{ 
    connect();
    console.log("Server started on port",port);
})