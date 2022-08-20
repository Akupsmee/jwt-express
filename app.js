import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import dotenv from 'dotenv';
import startDB  from  "./helpers/init_mongodb.js"

startDB();

import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res, next) => {
    res.send('Hello World!');
})

app.use('/api/v1/auth', authRouter);

app.use( async (req, res, next) => {
    // const error = new Error("Not Found error")
    // error.status = 404;
    // next(error);
    // next(createError(404));
    next(createError.NotFound("The route was not found"));
} );

app.use ( async (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status : error.status,
            message: error.message
        }
    });
} );


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

