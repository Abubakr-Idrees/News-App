import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

function PostComment({ item, user }) {
  const [like, setLike] = useState(false)

  return (
    <div className=" w-100 post-comments">
      <Row className='w-100' >
        <Col className='' xs={9} >
          <p className='m-0'>
            <strong className='px-2'>{user}</strong>
            {item}
          </p>
        </Col>
        <Col className='text-end' xs={3}>
          <Button onClick={() => setLike(!like)} className={`${like ? 'bg-primay' : 'bg-secondary'} p-0`} >
            <p className='text-small p-0 m-0 px-1'>
              {like ? 'Liked' : 'Like'}
            </p>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PostComment

