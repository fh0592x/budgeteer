import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user';
import budgetRoutes from './routes/budget';
import categoryRoutes from './routes/category';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(helmet());

app.use(`${ process.env.BASE_URL }/users`, userRoutes);
app.use(`${ process.env.BASE_URL }/budgets`, budgetRoutes);
app.use(`${ process.env.BASE_URL }/categories`, categoryRoutes);


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => app.listen(process.env.PORT, () => console.log(`API is live on port ${ process.env.PORT }`)))
.catch(err => {
    console.log(err);
    process.exit(1);
});