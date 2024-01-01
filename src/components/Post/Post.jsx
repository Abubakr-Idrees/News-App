import React, { useState } from 'react';
import './Post.css';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import PostComment from './components/PostComment';

const Post = ({ user, article }) => {
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reported, setReported] = useState(false);
  const [confirmReport, setConfirmReport] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleClear = () => {
    setCommentText('');
  };

  const handleReportSubmit = () => {
    setReported(true);
    setConfirmReport(false);
    setShowReportModal(false);
  };

  const handleCommentDelete = () => {
    if (commentToDelete !== null) {
      const updatedComments = [...commentsList];
      updatedComments.splice(commentToDelete, 1);
      setCommentsList(updatedComments);
      setCommentToDelete(null);
    }
  };

  const handleCommentEdit = () => {
    if (commentToEdit !== null && editedComment.trim() !== '') {
      const updatedComments = [...commentsList];
      updatedComments[commentToEdit] = editedComment;
      setCommentsList(updatedComments);
      setCommentToEdit(null);
      setEditedComment('');
    }
  };

  return (
    <div className="post ">
      <div className="post-header">
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
          <Button
            className={likes ? 'bg-primary' : 'bg-secondary'}
            onClick={() => {
              setLikes(!likes);
              setDislikes(false);
            }}
          >
            Like
          </Button>
          <Button
            className={dislikes ? 'bg-danger' : 'bg-secondary'}
            onClick={() => {
              setDislikes(!dislikes);
              setLikes(false);
            }}
          >
            Dislike
          </Button>
          <Button
            variant={reported ? 'danger' : 'secondary'}
            onClick={() => {
              setConfirmReport(true);
              setShowReportModal(true);
            }}
          >
            {reported ? 'Reported' : 'Report'}
          </Button>
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
                setCommentsList([...commentsList, commentText]);
                setCommentText('');
                handleClear();
              }}
              variant="outline-secondary"
              id="button-addon2"
            >
              Comment
            </Button>
          </InputGroup>
        </div>
        <div className='d-flex'>
          {likes && <p className='m-2'>1 Like</p>}
          {dislikes && <p className='m-2'>1 Dislike</p>}
          {commentsList?.length > 0 && (
            <p className='d-inline-block m-2 '>{commentsList?.length} Comments</p>
          )}
        </div>
      </div>
      {commentsList?.length > 0 && (
        <>
          {commentsList?.map((item, ind) => (
            <PostComment
              key={ind}
              index={ind}
              item={item}
              user={user}
              onDelete={() => setCommentToDelete(ind)}
              onEdit={() => setCommentToEdit(ind)}
            />
          ))}
        </>
      )}

      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        {!confirmReport ? (
          <Modal.Body>
            <p>Are you sure you want to report this post?</p>
            <Button variant="primary" onClick={() => setConfirmReport(true)}>
              Yes, Report
            </Button>
            <Button variant="secondary" onClick={() => setShowReportModal(false)}>
              Cancel
            </Button>
          </Modal.Body>
        ) : (
          <Modal.Body>
            {}
            <p>Report Form Goes Here</p>
            <Button variant="primary" onClick={handleReportSubmit}>
              Submit Report
            </Button>
          </Modal.Body>
        )}
      </Modal>

      <Modal show={commentToDelete !== null} onHide={() => setCommentToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this comment?</p>
          <Button variant="danger" onClick={handleCommentDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setCommentToDelete(null)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={commentToEdit !== null} onHide={() => setCommentToEdit(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <Button variant="primary" onClick={handleCommentEdit}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setCommentToEdit(null)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Post;
