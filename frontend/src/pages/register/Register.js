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
        <Title>
          <i class="fas fa-kiwi-bird"></i>
          <br></br>
          FlaminGoo
        </Title>
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
      <LoginContainer>
        Already registered?
        <LoginOption>
          <Link className="link" to="/login">
            Sign in
          </Link>
        </LoginOption>
      </LoginContainer>
      <BottomTerms>
        By signing in, you agree to our
        <br></br>
        <a href="/" style={{ color: 'black' }}>
          Privacy Policy
        </a>
        , and&nbsp;&nbsp;
        <a href="/" style={{ color: 'black' }}>
          Terms of Service
        </a>
        .
      </BottomTerms>
      {error && <ErrorMsg>Something went wrong!</ErrorMsg>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(101.8vh - 50px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  no-repeat center fixed;
  `;

// margin-top: -100px;

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

// margin-top: 180px;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #ebebeb;
  border-radius: 0.5rem;
  padding: 60px 60px 90px;

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
  margin-top: 35rem;
  text-align: center;
  position: absolute;
  border: none;
  margin-right: 2px;
`;
// padding: 10px;

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

const BottomTerms = styled.p`
  font-size: 12px;
  display: inline-block;
  margin-top: 52rem;
  text-align: center;
  position: absolute;
  border: none;
  margin-right: 2px;
`;

const ErrorMsg = styled.span`
  color: red;
  margin-top: -45px;
`;
