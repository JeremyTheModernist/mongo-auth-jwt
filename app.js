import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import connectDB from './connectDB/index.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3250;

app.use(express.json());

app.listen(PORT, () => {
  console.log('listening on the port', PORT);
});

routes(app);

connectDB();

mongoose.connection.once('open', () => {
  console.log('connection has been opened');
});
