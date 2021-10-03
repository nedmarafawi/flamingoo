import React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import styled from 'styled-components';

export default function SinglePost() {
  const publicFolder = 'http://localhost:8800/images/';
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  // console.log(location.pathname.split('/')[2]);
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      // console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdatePost(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <PostContainer>
        {post.photo && <Image src={publicFolder + post.photo} alt="" />}
        {updatePost ? (
          <TitleInput
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <Title>
            {title}
            {post.username === user?.username && (
              <PostEdit>
                <PostIcon
                  className=" far fa-edit"
                  onClick={() => setUpdatePost(true)}
                ></PostIcon>
                <PostIcon
                  className=" far fa-trash-alt"
                  onClick={handleDelete}
                ></PostIcon>
              </PostEdit>
            )}
          </Title>
        )}
        <PostInfo>
          <PostBy>
            By:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </PostBy>
          <PostDate>{new Date(post.createdAt).toDateString()}</PostDate>
        </PostInfo>
        {updatePost ? (
          <DescInput value={desc} onChange={(e) => setDesc(e.target.value)} />
        ) : (
          <Desc>{desc}</Desc>
        )}
        {updatePost && <Button onClick={handleUpdate}>Update</Button>}
      </PostContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 9;
`;

const PostContainer = styled.div`
  padding: 20px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px;
  font-family: 'Lora', serif;
  font-size: 28px;
`;

/* float: right; */
const PostEdit = styled.div`
  margin-left: 10px;
  font-size: 16px;
`;

const PostIcon = styled.i`
  margin-left: 10px;
  cursor: pointer;

  &:first-child {
    color: teal;
  }
  &:last-child {
    color: tomato;
  }
`;

/* display: flex; */
const PostInfo = styled.div`
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  justify-content: space-between;
  font-size: 16px;
  font-family: 'Varela Round', sans-serif;
  color: #0e0e0e;
`;

const PostBy = styled.span``;

const PostDate = styled.span``;

const Desc = styled.p`
  /* word-wrap: normal; */
  color: #666;
  font-size: 18px;
  line-height: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  &:first-letter {
    margin-left: 20px;
    font-size: 30px;
    font-weight: 600;
  }
`;

const TitleInput = styled.input`
  margin: 10px;
  font-family: 'Lora', serif;
  font-size: 28px;
  text-align: center;
  border: none;
  color: gray;
  border-bottom: 1px solid lightgray;

  &:focus {
    outline: none;
  }
`;

/* border: none; */
const DescInput = styled.textarea`
  color: #666;
  font-size: 18px;
  line-height: 25px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100px;
  border: none;
  background-color: teal;
  padding: 5px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;
`;
