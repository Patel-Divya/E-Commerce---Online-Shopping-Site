require('dotenv').config();

const express = require('express');
const connectDB = require('./util/dbConnect');
const cors = require('cors');
const port = 5000;
const app = express();
const errorMiddleware = require('./middleware/error-middleware');
const authRouter = require('./route/auth-router');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api/v1/auth', authRouter);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`App is running on port: ${port}`);
    });
});

app.use(errorMiddleware);