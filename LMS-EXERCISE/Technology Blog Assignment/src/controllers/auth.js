import { getArticleByCredentials } from '../services/auth.js';
import HttpError from '../utils/HttpError.js';
import jwt from 'jsonwebtoken';

const login = ( req, res, next ) => {
    const { body } = req;

    getArticleByCredentials( body )    
        .then(article => {
            if( !article ) {
                const httpError = new HttpError( 'Go away you hacker', 401 );
                next( httpError );
                return;
            }

           
            const claims = {
                author:article.author,
            };

            jwt.sign( claims, process.env.JWT_SECRET, ( err, token ) => {
                if( err ) {
                    const httpError = new HttpError( 'Unable to generate token right now. Please try again later.', 500 );
                    next( httpError );
                    return;
                }

                res.json({
                    author:article.author,
                    token: token,
                });
            });
        });
};

export {
    login
};