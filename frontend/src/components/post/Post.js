import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const publicFolder = 'http://localhost:8800/images/';
  return (
    <Wrapper>
      {post.photo && <Image src={publicFolder + post.photo} alt="" />}
      {/* <img
        className="postImg"
        src="https://lh3.googleusercontent.com/proxy/vAOyU3Q7cGAhWVOLvrNXZktU0fcNjVGe3l34UkfgN7yOmP7hGFgNdej6LHqU4zf9f2urA1VPRuIs2Imal6YEUAH0UO1CM-8E34Oy4MfJuuGwOheOXhd-1PKkDOSOrvly"
        alt=""
      /> */}
      <PostInfo>
        <Categories>
          {post.categories.map((category) => (
            <Category>{category.name}</Category>
          ))}
        </Categories>
        <Link to={`/post/${post._id}`} className="link">
          <Title>{post.title}</Title>
        </Link>
        <hr />
        <PostDate>{new Date(post.createdAt).toDateString()}</PostDate>
      </PostInfo>
      <Desc>{post.desc}</Desc>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 385px;
  margin: 0px 25px 40px 25px;
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 7px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.div`
  font-family: 'Varela Round', sans-serif;
  font-size: 11px;
  color: #be9656;
  line-height: 20px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const Categories = styled.div``;

const Title = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-top: 15px;
  cursor: pointer;
`;

const PostDate = styled.span`
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 13px;
  color: #999;
  margin-top: 15px;
`;

const Desc = styled.p`
  font-family: 'Varela Round', sans-serif;
  font-size: 14px;
  color: #444;
  line-height: 24px;
  margin-top: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
