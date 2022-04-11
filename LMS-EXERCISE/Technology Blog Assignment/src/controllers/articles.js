import {
  fetchArticles,
  fetchArticleById,
  addArticle,
  updateArticle,
  removeArticle,
  addComment,
  fetchComments
} from "../services/articles.js";
import HttpError from '../utils/HttpError.js';


const getArticles = (req, res, next) => {
  
  let { sort, order, page, q } = req.query;

 
  let pageInt = parseInt(page); 

  if (isNaN(pageInt)) {
    pageInt = 1;
  }

 
  if (!sort) {
    sort = "author";
  }

 
  if (!order) {
    order = "asc";
  }

  fetchArticles(sort, order, pageInt, q)
    .then((articles) => {
        res.json(articles);
    })
    .catch((err) => {
        
        const httpError = new HttpError( err.message, 500 );
        next( httpError );
    });
};


const getArticleById = (req, res, next) => {
  const { _id } = req.params;

  fetchArticleById(_id)
    .then((article) => {
      if( !article ) {
          
          const httpError = new HttpError( 'Article with given id does not exist', 404 );
          next( httpError );
          return;
      }

      res.json(article);
    })
    .catch((err) => {
      if( err.kind === 'ObjectId' ) {
         
          const httpError = new HttpError( 'Invalid article id', 400 );
          next( httpError );
      } else {
         
          const httpError = new HttpError( err.message, 500 );
          next( httpError );
      }
    });
};


const postArticle = (req, res, next) => {
  const { body } = req;
  console.log( Object.keys( body ) );

  
  if( Object.keys( body ).length === 0 ) {
    const httpError = new HttpError( 'Request body is empty. Article details are missing.', 400 );
    next( httpError );
    return;
  }

  addArticle( body )
    .then(article => {
      res.status( 201 ).json( article );
    })
    .catch(err => {
      const httpError = new HttpError( err.message, 400 );
      next( httpError );
    });
};


const putArticle = ( req, res, next ) => {
  const { body } = req;
  const { _id } = req.params;

  
  if( Object.keys( body ).length === 0 ) {
    const httpError = new HttpError( 'Request body is empty.Article details are missing.', 400 );
    next( httpError );
    return;
  }

  updateArticle( _id, body )
    .then(article => {
      res.json( article );
    })
    .catch(err => {
      if( err.kind === 'ObjectId' ) {
        
        const httpError = new HttpError( 'Invalid article id', 400 );
        next( httpError );
      } else {
         
          const httpError = new HttpError( err.message, 500 );
          next( httpError );
      }
    });
};

const deleteArticle = ( req, res, next ) => {
  const { _id } = req.params;

  removeArticle( _id )
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      if( err.kind === 'ObjectId' ) {
       
        const httpError = new HttpError( 'Invalid article id', 400 );
        next( httpError );
      } else {
          
          const httpError = new HttpError( err.message, 500 );
          next( httpError );
      }
    });
};


const postComment = (req, res, next) => {
  const { _id } = req.params;
  const { body } = req;

  
  if( Object.keys( body ).length === 0 ) {
    const httpError = new HttpError( 'Request body is empty.Comment details are missing.', 400 );
    next( httpError );
    return;
  }

  addComment( _id, body )
    .then(article => {
      res.status( 201 ).json( article );
    })
    .catch(err => {
      const httpError = new HttpError( err.message, 400 );
      next( httpError );
    });
};

const getComments = (req, res, next) => {
  const { _id } = req.params;

  fetchComments( _id )
    .then((comments) => {
        res.json(comments);
    })
    .catch((err) => {
        const httpError = new HttpError( err.message, 500 );
        next( httpError );
    });
}

export { getArticles, getArticleById, postArticle, putArticle, deleteArticle, postComment, getComments };