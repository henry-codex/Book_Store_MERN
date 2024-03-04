import express from 'express';
import cors from 'cors';
import {
    PORT,
    mongoDBURL
} from './config.js'; // Assuming PORT is defined in config.js
import mongoose from 'mongoose';

import bookRoutes from './routes/bookRoutes.js';

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS  POLICES
// Option 1: allow all origins with default of cors(*)
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', bookRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });