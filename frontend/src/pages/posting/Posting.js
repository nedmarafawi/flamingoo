import React from 'react';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Posting() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.photo = fileName;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post('/posts', newPost);
      // Goes to single post
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {file && <Image src={URL.createObjectURL(file)} alt="" />}

      <PostingForm onSubmit={handleSubmit}>
        <FormGroup>
          <FileLabel htmlFor="fileInput">
            {/* <PostingIcon className="fas fa-plus"></PostingIcon> */}
            <PostIcon>
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
                    fill="#85D0CC"
                    d="M22 14V5C22 3.9 21.1 3 20 3H4C2.9 3 2 3.9 2 5V15V17C2 18.1 2.9 19 4 19H14"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    undefined="1"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                    stroke="#265F58"
                    d="M22 14V5C22 3.9 21.1 3 20 3H4C2.9 3 2 3.9 2 5V15V17C2 18.1 2.9 19 4 19H14"
                  ></path>
                  <path
                    fill="#98EED5"
                    d="M22 14L17 8L11 16L6 12L2 15V17C2 18.1 2.9 19 4 19H14"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    undefined="1"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                    stroke="#265F58"
                    d="M22 14L17 8L11 16L6 12L2 15V17C2 18.1 2.9 19 4 19H14"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                    stroke="#265F58"
                    fill="#98EED5"
                    d="M7 8C7.55228 8 8 7.55228 8 7C8 6.44772 7.55228 6 7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8Z"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                    stroke="#265F58"
                    d="M17 19H23"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                    stroke="#265F58"
                    d="M20 16V22"
                  ></path>
                </svg>
              </>
            </PostIcon>
          </FileLabel>

          <FileInput
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <PostingInput
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Text
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></Text>
        </FormGroup>
        <Button type="submit">Post</Button>
      </PostingForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 70px;
  min-height: 40vh;
`;

/* margin-left: 150px; */
/* width: 70vw; */
const Image = styled.img`
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 38%;
`;

// TODO: Remove underline
const FileLabel = styled.label``;

const FileInput = styled.input``;

const PostingForm = styled.form`
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 38%;

  border-radius: 10px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

/* margin-left: 150px; */
const FormGroup = styled.div`
  display: flex;
  align-items: center;
`;

const PostIcon = styled.i`
  width: 25px;
  height: 25px;
  padding-left: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
      -webkit-transform: scale(1.3) translateZ(0);
      transform: scale(1.3) translateZ(0);
    }
  }
`;

// const PostingIcon = styled.i`
//   width: 25px;
//   height: 25px;
//   padding-left: 0.7rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   color: rgb(121, 118, 118);
//   cursor: pointer;
// `;

const PostingInput = styled.input`
  border: none;
  font-size: 30px;
  padding: 10px;
  width: 100vw;

  &:focus {
    outline: none;
  }
`;

// TODO: Need to fix the border size
// border: none;
const Text = styled.textarea`
  resize: none;
  font-size: 20px;
  height: 25vh;
  min-width: 690px;
  max-width: 100%;
  border: none;
  padding-left: 1em;
  outline: none;

  overflow: auto;
`;
// border-radius: 5px;

/* right: 50px; */
const Button = styled.button`
  position: absolute;
  top: 110%;
  left: 87%;

  color: white;
  background-color: #0083a3;
  padding: 10px 30px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #00647d;
  }
`;
