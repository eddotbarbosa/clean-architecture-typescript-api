import express from 'express';

import apiV1Router from './routes/routers/apiV1.router';

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api/v1', apiV1Router);

export default app;
