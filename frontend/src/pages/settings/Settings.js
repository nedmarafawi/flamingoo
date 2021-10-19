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
          <Title>Profile Settings</Title>
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
              <ProfileIcon>
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
                      strokeWidth="1"
                      stroke="#265F58"
                      fill="#85D0CC"
                      d="M20 13C19.17 12.37 18.13 12 17 12C14.24 12 12 14.24 12 17C12 18.13 12.37 19.17 13 20H5C3.34 20 2 18.66 2 17V5C2 3.34 3.34 2 5 2H17C18.66 2 20 3.34 20 5V13Z"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                      stroke="#265F58"
                      fill="#98EED5"
                      d="M12.8401 14.22C12.3101 15.02 12.0001 15.97 12.0001 17C12.0001 18.13 12.3701 19.17 13.0001 20H5.00014C4.41014 20 3.85014 19.83 3.39014 19.53C4.43014 16.32 7.44014 14 11.0001 14C11.6401 14 12.2501 14.07 12.8401 14.22Z"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                      stroke="#265F58"
                      fill="#98EED5"
                      d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                      stroke="#265F58"
                      fill="#85D0CC"
                      d="M17 22C19.76 22 22 19.76 22 17C22 14.24 19.76 12 17 12C14.24 12 12 14.24 12 17C12 19.76 14.24 22 17 22Z"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                      stroke="#265F58"
                      d="M14 17H20"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                      stroke="#265F58"
                      d="M17 14V20"
                    ></path>
                  </svg>
                </>
              </ProfileIcon>
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
// background-color: rgb(135, 230, 224);
const SettingsContainer = styled.div`
  background-color: #dcf2f2;
  border-radius: 0.5rem;
  padding: 50px 240px;
  margin-top: 45px;
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: -36px;
`;

const ProfileIcon = styled.i`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 50px;
  margin-top: 200px;

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

const UsernameLabel = styled.p`
  font-size: 20px;
  margin: 10px 7px;
`;

const EmailLabel = styled.p`
  font-size: 20px;
  margin: 10px 7px;
`;

const PasswordLabel = styled.p`
  font-size: 20px;
  margin: 10px 7px;
`;

const ProfileInput = styled.input`
  padding: 1rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  outline: none;

  &:hover {
    box-shadow: 0px 15px 36px rgba(0, 0, 0, 0.15);
  }
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

  &:hover {
    background-color: #00647d;
  }
`;

const SuccessMsg = styled.span`
  color: green;
  text-align: center;
  margin-top: 20px;
`;
