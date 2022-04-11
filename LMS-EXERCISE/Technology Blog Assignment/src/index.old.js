import express from 'express';

const app = express();

app.get( '/articles', ( req, res ) => {
    res.send( 'We will send the list of articles' );
});

const PORT = process.env.PORT || 4000;

app.listen( PORT, err => {
    if( err ) {
        console.log( error.message );
        return;
    }

    console.log( `Started http://localhost:${PORT}` );
});