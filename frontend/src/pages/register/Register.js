import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Wrapper>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>FlaminGoo</Title>
        <SubTitle>Sign up to share your story.</SubTitle>
        <UsernameLabel>Username</UsernameLabel>
        <RegisterInput
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <EmailLabel>Email</EmailLabel>
        <RegisterInput
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordLabel>Password</PasswordLabel>
        <RegisterInput
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <RegisterBtn type="submit">Create your free account</RegisterBtn>
      </RegisterForm>
      {error && <ErrorMsg>Something went wrong!</ErrorMsg>}
      <LoginContainer>
        Already registered?
        <LoginOption>
          <Link className="link" to="/login">
            Sign in
          </Link>
        </LoginOption>
      </LoginContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
  opacity: 0.9;
`;

const Title = styled.span`
  font-size: 50px;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 30px;
  font-weight: 700;
`;

const SubTitle = styled.span`
  font-size: 15px;
  text-align: center;
  margin-top: -35px;
  margin-bottom: 30px;
  color: gray;
`;

const RegisterForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  background-color: #ebebeb;
  border-radius: 0.5rem;
  padding: 60px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

const RegisterInput = styled.input`
  padding: 1rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  outline: none;

  &:hover {
    box-shadow: 0px 15px 36px rgba(0, 0, 0, 0.15);
  }
`;

const UsernameLabel = styled.p`
  margin: 10px 7px;
`;

const EmailLabel = styled.p`
  margin: 10px 7px;
`;

const PasswordLabel = styled.p`
  margin: 10px 7px;
`;

// margin-top: 20px;
// cursor: pointer;
// background-color: teal;
// border: none;
// color: white;
// border-radius: 10px;
// padding: 10px;
const RegisterBtn = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 0.938rem;
  outline: none;
  border: none;
  margin-bottom: 3rem;
  margin-top: 1rem;
  background-color: #0083a3;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #00647d;
  }
`;

const LoginContainer = styled.div`
  display: inline-block;
  margin-top: 33rem;
  text-align: center;
  position: absolute;
  border: none;
  padding: 10px;
  margin-right: 2px;
`;

const LoginOption = styled.p`
  display: inline-block;
  cursor: pointer;
  color: blue;
  margin-left: 10px;

  font-size: 1rem;
  color: #005063;
  font-weight: 500;

  &:hover {
    color: #0083a3;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  margin-top: -60px;
`;
