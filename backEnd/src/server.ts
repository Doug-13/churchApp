// import express from 'express';
import dotenv from 'dotenv';

import app from './app'

dotenv.config();
const PORT = process.env.PORT || 3006;

app.listen(process.env.PORT, () => console.log(`Running on port ${PORT}!`));
