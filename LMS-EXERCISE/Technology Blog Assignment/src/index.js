
import dotenev from 'dotenv';
dotenev.config();

import './data/index.js';

import express from 'express';

import articlesRouter from './routes/articles.js';

import indexRouter from './routes/pages/index.js';
import articlesPageRouter from './routes/pages/articles.js';

import authRouter from './routes/auth.js';

import HttpError from './utils/HttpError.js';
import fs from 'fs';
import path from 'path';

const app = express();

app.set( 'views', path.join( process.cwd(), 'src', 'views' ) );
app.set( 'view engine', 'ejs' );

app.use(( req, res, next ) => {
    const logMessage = `${req.method} ${req.url} at time ${new Date().toTimeString()}\n`;

    fs.writeFile( path.join( process.cwd(), 'src', 'server.log' ), logMessage, { encoding: 'utf-8', flag: 'a+' }, ( err ) => {
        if( err ) {
            console.log( err.message );
        }

        next(); 
    });
});

app.use( express.static( path.join( process.cwd(), 'src', 'public' ) ) );

app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

app.use( '/auth', authRouter );
app.use( '/articles', articlesRouter );

app.use( '/', indexRouter );
app.use( '/page/articles', articlesPageRouter );

app.use(( req, res, next ) => {
    const httpError = new HttpError( 'Resource not found', 404 );
    next( httpError );
});

app.use(( httpError, req, res, next ) => {
    res.status( httpError.statusCode || 500 ).json({
        message: httpError.message
    });
});

const PORT = process.env.PORT || 4000;

app.listen( PORT, err => {
    if( err ) {
        console.log( error.message );
        return;
    }

    console.log( `Started http://localhost:${PORT}` );
});