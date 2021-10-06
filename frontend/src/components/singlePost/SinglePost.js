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
                  // className=" far fa-edit"
                  onClick={() => setUpdatePost(true)}
                >
                  <>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      dataReactroot=""
                    >
                      <path
                        fill="#98EED5"
                        d="M20 12V21C20 21.55 19.55 22 19 22H3C2.45 22 2 21.55 2 21V5C2 4.45 2.45 4 3 4H12"
                        undefined="0"
                        transform="translate(2,2)"
                      ></path>
                      <path
                        fill="none"
                        d="M20 12V21C20 21.55 19.55 22 19 22H3C2.45 22 2 21.55 2 21V5C2 4.45 2.45 4 3 4H12"
                        undefined="1"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        d="M20 12V21C20 21.55 19.55 22 19 22H3C2.45 22 2 21.55 2 21V5C2 4.45 2.45 4 3 4H12"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="0"
                        stroke="#265F58"
                        fill="#98EED5"
                        d="M19.15 2.38001L9.24 12.29L8 16L11.71 14.76L21.62 4.85001C22.07 4.40001 22.13 3.71001 21.74 3.32001L20.68 2.26001C20.29 1.87001 19.6 1.92001 19.15 2.38001Z"
                        transform="translate(2,2)"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        fill="none"
                        d="M19.15 2.38001L9.24 12.29L8 16L11.71 14.76L21.62 4.85001C22.07 4.40001 22.13 3.71001 21.74 3.32001L20.68 2.26001C20.29 1.87001 19.6 1.92001 19.15 2.38001Z"
                      ></path>
                    </svg>
                  </>
                </PostIcon>
                <PostIcon
                  // className=" far fa-trash-alt"
                  onClick={handleDelete}
                >
                  <>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      dataReactroot=""
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="0"
                        stroke="#265F58"
                        fill="#98EED5"
                        d="M16.15 22H7.85C7.36 22 6.94 21.65 6.86 21.16L5 10H19L17.14 21.16C17.06 21.65 16.64 22 16.15 22Z"
                        transform="translate(2,2)"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        fill="none"
                        d="M16.15 22H7.85C7.36 22 6.94 21.65 6.86 21.16L5 10H19L17.14 21.16C17.06 21.65 16.64 22 16.15 22Z"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        d="M3.5 10H20.5"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        d="M10 13.5V18.5"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        d="M14 13.5V18.5"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="0"
                        stroke="#265F58"
                        fill="#98EED5"
                        d="M15.95 4.56L8.04999 5.87L9.30999 3.07C9.44999 2.77 9.72999 2.55 10.06 2.49L12.95 2.01C13.28 1.96 13.62 2.07 13.84 2.31L15.95 4.56Z"
                        transform="translate(2,2)"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        fill="none"
                        d="M15.95 4.56L8.04999 5.87L9.30999 3.07C9.44999 2.77 9.72999 2.55 10.06 2.49L12.95 2.01C13.28 1.96 13.62 2.07 13.84 2.31L15.95 4.56Z"
                      ></path>
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                        stroke="#265F58"
                        d="M3 6.71001L21 3.71001"
                      ></path>
                    </svg>
                  </>
                </PostIcon>
              </PostEdit>
            )}
          </Title>
        )}
        <PostInfo>
          By:
          <PostBy>
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

// flex: 9;
// height: 1000px;
// height: calc(110vh - 50px);
const Wrapper = styled.div`
  height: calc(110vh - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-repeat: no-repeat;
  background-size: 100% 150%;
`;
// background-size: cover;

// padding: 20px;
// flex-direction: column;
// padding-right: 0;
// display: flex;
const PostContainer = styled.div`
  position: absolute;
  display: block;
  margin-left: auto;
  left: 25%;
  margin-right: auto;
  width: 50%;
`;

const Image = styled.img`
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px;
  font-family: 'Lora', serif;
  font-size: 28px;
`;

/* float: right; */
const PostEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
`;

const PostIcon = styled.i`
  margin-left: 10px;
  cursor: pointer;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;

  &:first-child {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;

    &:hover {
      -webkit-transform: scale(1.5) rotate(12deg);
      transform: scale(1.5) rotate(10deg);
    }
    color: black;
  }
  &:last-child {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    &:hover {
      -webkit-transform: rotate(-18deg);
      transform: scale(1.5) rotate(-18deg);
    }
    color: red;
  }
`;

/* display: flex; */
const PostInfo = styled.div`
  margin-bottom: 20px;
  display: block;
  margin-left: 1px;
  margin-right: auto;
  width: 50%;
  justify-content: space-between;
  font-size: 16px;
  font-family: 'Varela Round', sans-serif;
  color: #0e0e0e;
`;

const PostBy = styled.span`
  margin-right: 10px;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);

  &:first-child {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-property: color;
    transition-property: color;

    &:hover {
      color: #0083a3;
    }
  }
`;

const PostDate = styled.span``;

/* word-wrap: normal; */
const Desc = styled.p`
  color: #666;
  font-size: 18px;
  line-height: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;
// &:first-letter {
//   margin-left: 20px;
//   font-size: 30px;
//   font-weight: 600;
// }

const TitleInput = styled.input`
  padding: 10px;
  margin-left: 280px;

  font-family: 'Lora', serif;
  font-size: 28px;
  text-align: center;
  border: none;
  border-radius: 5px;
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
  width: 100%;
  height: 280px;
  line-height: 25px;
  border: none;
  resize: none;
  border-radius: 5px;
  padding: 10px 10px 15px 15px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 100%;
  left: 92%;

  width: 100px;
  border: none;
  background-color: teal;
  padding: 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;
`;
