import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Settings() {
  const publicFolder = 'http://localhost:8800/images/';
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profileAvatar = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/users/${user._id}`, {
  //       data: { userId: user._id },
  //     });
  //     window.location.replace('/auth/login');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Wrapper>
      <SettingsContainer>
        <SettingsTitle>
          <Title>Update Your Account</Title>
          {/* <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete Account
          </span> */}
        </SettingsTitle>
        <SettingsForm onSubmit={handleSubmit}>
          <ProfileTitle>Profile Picture</ProfileTitle>
          <ProfileAvatar>
            <Image
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profileAvatar
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <ProfileIcon className=" far fa-user-circle"></ProfileIcon>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </ProfileAvatar>
          <UsernameLabel>Username</UsernameLabel>
          <ProfileInput
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <EmailLabel>Email</EmailLabel>
          <ProfileInput
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordLabel>Password</PasswordLabel>
          <ProfileInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Update</Button>
          {success && <SuccessMsg>Profile has been updated!</SuccessMsg>}
        </SettingsForm>
      </SettingsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// flex: 9;
const SettingsContainer = styled.div`
  padding: 20px;
`;

const SettingsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 30px;
  margin-bottom: 20px;
  color: black;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const ProfileTitle = styled.p``;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  object-fit: cover;
`;

const ProfileIcon = styled.i`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
`;

const UsernameLabel = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

const EmailLabel = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

const PasswordLabel = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

const ProfileInput = styled.input`
  color: gray;
  margin: 10px 0;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;
`;

const Button = styled.button`
  width: 150px;
  align-self: center;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #0083a3;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const SuccessMsg = styled.span`
  color: green;
  text-align: center;
  margin-top: 20px;
`;
