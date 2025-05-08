import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import ideaController from './controllers/ideaController.mjs';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/ideas', ideaController);

/**
 * Start server
 */
const PORT = process.env.PORT;
app.listen(PORT, async () => {
    await connect(false);
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Connect to MongoDB
 */
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        console.log('Successfully connected to MongoDB using Mongoose.');
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}