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
            <PostingIcon className=" fas fa-plus"></PostingIcon>
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
  padding-top: 50px;
`;

/* margin-left: 150px; */
/* width: 70vw; */
const Image = styled.img`
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

// TODO: Remove underline
const FileLabel = styled.label``;

const FileInput = styled.input``;

const PostingForm = styled.form`
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

/* margin-left: 150px; */
const FormGroup = styled.div`
  display: flex;
  align-items: center;
`;

const PostingIcon = styled.i`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: rgb(121, 118, 118);
  cursor: pointer;
`;

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
  min-width: 700px;
  max-width: 100%;
`;

/* right: 50px; */
const Button = styled.button`
  position: absolute;
  top: 138%;
  left: 1%;
  color: white;
  background-color: teal;
  padding: 10px 20px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
`;
