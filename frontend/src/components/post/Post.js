import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const publicFolder = 'http://localhost:8800/images/';
  return (
    <Wrapper>
      {post.photo && (
        <Link to={`/post/${post._id}`} className="link">
          <Image src={publicFolder + post.photo} alt="" />
        </Link>
      )}

      <PostInfo>
        {/* <Categories>
          {post.categories.map((category) => (
            <Category>{category.name}</Category>
          ))}
        </Categories> */}
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
  position: relative;
  top: 100%;
  border: 5px solid #edfdfb;
  background-color: #f2f8f8;
  margin: 0px 25px 40px 25px;

  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 2px;
  z-index: 1;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Category = styled.div`
//   font-family: 'Varela Round', sans-serif;
//   font-size: 11px;
//   color: #be9656;
//   line-height: 20px;
//   margin-top: 15px;
//   margin-right: 10px;
//   cursor: pointer;
// `;

// const Categories = styled.div``;

const Title = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-top: 15px;
  cursor: pointer;
`;

// color: #999;
const PostDate = styled.span`
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 13px;
  color: black;
  margin-top: 15px;
  padding: 3px 10px 3px 10px;
  background-color: #e4f1f1;
  border-radius: 2px;
`;

const Desc = styled.p`
  font-family: 'Varela Round', sans-serif;
  font-size: 14px;
  color: #444;
  line-height: 24px;
  padding: 5px 30px;
  margin-top: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
