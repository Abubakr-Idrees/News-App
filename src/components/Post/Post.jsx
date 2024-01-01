import React, { useState } from 'react';
import './Post.css';
import { Button, Form, InputGroup } from 'react-bootstrap';
import PostComment from './components/PostComment';

const Post = ({ user, article }) => {


  const [likes, setLikes] = useState(false)
  const [comments, setComments] = useState(1)
  const [commentsList, setCommentsList] = useState([])
  const [commentText, setCommentText] = useState('')
  console.log('commentsList', commentsList)
  const handleClear = () => {
    setCommentText('');
  };



  // <div className='news-item'>
  //   <img
  //     src={article.urlToImage}
  //     alt={article.title}
  //     className='news-image'
  //   />
  //   <div className='news-content'>
  //     <h3 className='news-title'>{article.title}</h3>
  //     <p className='news-description'>{article.description}</p>
  //     <a
  //       href={article.url}
  //       target='_blank'
  //       rel='noopener noreferrer'
  //       className='news-link'
  //     >
  //       Read more
  //     </a>
  //   </div>
  // </div>

  return (

    <div className="post ">
      <div className="post-header">
        {/* <img


          className="post-avatar"
          src="https://placekitten.com/50/50"
          alt="Avatar"
        /> */}
        <div className="post-header-text">
          <h3 className='news-title'>{article.title}</h3>
          <p className='news-description'>{article.description}</p>
        </div>
      </div>
      <div className="post-body">
        <a
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
          className='news-link'
        >
          Read more
        </a>
        <img
          src={article.urlToImage}
          alt={article.title}
          className='news-image'
        />
      </div>
      <div className="my-3">
        <div className="post-actions my-2">
          <Button className={likes ? 'bg-primary' : 'bg-secondary'} onClick={() => setLikes(!likes)}>Like</Button>
          <InputGroup className="">
            <Form.Control
              className='m-0'
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comment"
              aria-label="Comment"
              aria-describedby="basic-addon2"
              value={commentText}
            />
            <Button
              onClick={() => {
                setCommentsList([...commentsList, commentText])
                setCommentText('')
                handleClear()
              }}

              variant="outline-secondary" id="button-addon2">
              Comment
            </Button>
          </InputGroup>
        </div>
        <div className='d-flex'>
          {
            likes &&
            <p className='m-2'>1 Like</p>
          }
          {
            commentsList?.length > 0 &&
            <p className='d-inline-block m-2 '>{commentsList?.length} Comments</p>
          }

        </div>
      </div>
      {
        commentsList?.length > 0 &&
        <>
          {
            commentsList?.map((item, ind) => (
              <PostComment key={ind} item={item} user={user} />
            ))
          }
        </>
      }
    </div>

  );
};

export default Post;
