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
      <Title>Register</Title>
      <RegisterForm onSubmit={handleSubmit}>
        <UsernameLabel>Username</UsernameLabel>
        <RegisterInput
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <EmailLabel>Email</EmailLabel>
        <RegisterInput
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordLabel>Password</PasswordLabel>
        <RegisterInput
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <RegisterBtn type="submit">Register</RegisterBtn>
      </RegisterForm>
      <LoginBtn>
        <Link className="link" to="/login">
          Login
        </Link>
      </LoginBtn>
      {error && <ErrorMsg>Something went wrong!</ErrorMsg>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
`;

const Title = styled.span`
  font-size: 50px;
`;

const RegisterForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const RegisterInput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
`;

const UsernameLabel = styled.p`
  margin: 10px 0;
`;

const EmailLabel = styled.p`
  margin: 10px 0;
`;

const PasswordLabel = styled.p`
  margin: 10px 0;
`;

const RegisterBtn = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: teal;
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px;
`;

const LoginBtn = styled.button`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: lightcoral;
  cursor: pointer;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 10px;
`;

const ErrorMsg = styled.span`
  color: red;
  margin-top: 75px;
`;
