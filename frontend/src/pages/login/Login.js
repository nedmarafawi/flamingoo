import React from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  // console.log(user);
  return (
    <Wrapper>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit}>
        <UsernameLabel>Username</UsernameLabel>
        <LoginInput
          type="text"
          placeholder="Enter your username"
          ref={userRef}
        />
        <PasswordLabel>Password</PasswordLabel>
        <LoginInput
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <LoginBtn type="submit" disabled={isFetching}>
          Login
        </LoginBtn>
      </LoginForm>
      <RegisterBtn>
        <Link className="link" to="/register">
          Register
        </Link>
      </RegisterBtn>
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
    url('https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
`;

const Title = styled.span`
  font-size: 50px;
`;

const LoginForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const UsernameLabel = styled.p`
  margin: 10px 0;
`;

const PasswordLabel = styled.p`
  margin: 10px 0;
`;

const LoginInput = styled.input`
  padding: 10px;
  background-color: white;
  border: none;
`;

const LoginBtn = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: rgb(243, 113, 26);
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px;

  &:disabled {
    cursor: not-allowed;
    background-color: rgb(252, 173, 173);
  }
`;

const RegisterBtn = styled.button`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: teal;
  cursor: pointer;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 10px;
`;
