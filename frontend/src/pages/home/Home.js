import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      // console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <Wrapper>
        <Posts posts={posts} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
