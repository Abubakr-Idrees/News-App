import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsService';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import Post from './Post/Post';
import { Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import NavbarMain from './Navbar/NavbarMain';


const Home = () => {
  const user = useSelector(st => st.auth.user)
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getNews = async () => {
    setIsLoading(true)
    const newsArticles = await fetchNews('us', searchText);
    setArticles(newsArticles);
    setIsLoading(false)
  };

  useEffect(() => {

    getNews();
  }, [searchText]);


  const Loader = () => {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
        </Spinner>
        <p className="mt-2">Loading...</p>
      </div>
    );
  };

  return (
    <div className=''>
      <NavbarMain />
      <Row className='px-5 pt-4'>
        <Col className='col-md-6'>
          <div className='d-flex'>
            <p className='m-2'>Filters</p>
            <InputGroup className="">
              <Form.Control
                className='m-0'
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title"
                aria-label="Search by title"
                aria-describedby="basic-addon2"
                value={searchText}
              />

            </InputGroup>
          </div>
        </Col>
      </Row>
      {
        isLoading ? <div>
          <Loader />
        </div>
          :
          <>
            {
              articles?.length > 0 ?
                <Row>
                  <Col className='col-md-6'>

                    {articles.map((item) => (
                      <Post key={item.title} article={item} user={user?.username} />

                    ))}
                  </Col>
                </Row>
                :
                <p className='w-100 text-center'>No News Found</p>
            }
          </>

      }
    </div>
  );
};

export default Home;
