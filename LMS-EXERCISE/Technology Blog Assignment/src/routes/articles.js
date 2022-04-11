import express from 'express';
import {
    getArticles,
    getArticleById,
    postArticle,
    putArticle,
    deleteArticle,
    postComment,
    getComments
} from '../controllers/articles.js';
import { authenticate, authorize } from '../middleware/auth.js';


const router = express.Router();


router.get(    '/'    , getArticles );
router.get(    '/:_id', getArticleById );


router.post(   '/'    , authenticate, authorize( [ 'author' ] ), postArticle );
router.put(    '/:_id', authenticate, authorize( [ 'author' ] ), putArticle );
router.delete( '/:_id', authenticate, authorize( [ 'author' ] ), deleteArticle );


router.get(    '/:_id/comments', getComments );


router.post(   '/:_id/comments', authenticate, authorize( [ 'commenter' ] ), postComment);


export default router;