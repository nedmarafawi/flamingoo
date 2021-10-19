import React, { useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    setError(false);
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      setError(true);
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  // console.log(user);
  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Hello!</Title>
        <SubTitle>Sign into your account here.</SubTitle>
        <OuterSpan>
          <UsernameLabel>Username</UsernameLabel>
          <LoginInput
            type="text"
            placeholder="Enter your username"
            ref={userRef}
          />
        </OuterSpan>
        <PasswordLabel>Password</PasswordLabel>
        <LoginInput
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <LoginBtn type="submit" disabled={isFetching}>
          Sign In
        </LoginBtn>
      </LoginForm>
      <RegisterContainer>
        Don't have an account?
        <RegisterOption>
          <Link className="link" to="/register">
            Sign up
          </Link>
        </RegisterOption>
      </RegisterContainer>
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
  height: calc(85vh - 50px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
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

// margin-top: 20px;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  background-color: #ebebeb;
  border-radius: 0.5rem;
  padding: 60px 60px 90px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

const OuterSpan = styled.div`
  margin-bottom: 10px;
`;

const UsernameLabel = styled.p`
  margin: 10px 7px;
`;

const PasswordLabel = styled.p`
  margin: 10px 7px;
`;

const LoginInput = styled.input`
  padding: 1rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  outline: none;

  &:hover {
    box-shadow: 0px 15px 36px rgba(0, 0, 0, 0.15);
  }
`;

// margin-top: 20px;
// cursor: pointer;
// background-color: rgb(243, 113, 26);
// border: none;
// color: white;
// border-radius: 10px;
// padding: 10px;

// &:disabled {
//   cursor: not-allowed;
//   background-color: rgb(252, 173, 173);
// }
const LoginBtn = styled.button`
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

// display: inline-block;
// margin-top: 26rem;
// text-align: center;
// position: absolute;
// border: none;
// padding: 10px;
// margin-right: 2px;
const RegisterContainer = styled.div`
  display: inline-block;
  margin-top: 25rem;
  text-align: center;
  position: absolute;
  border: none;
  margin-right: 2px;
`;

// right: 20px;
const RegisterOption = styled.p`
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
  margin-top: 42rem;
  text-align: center;
  position: absolute;
  border: none;
  margin-right: 2px;
`;

const ErrorMsg = styled.span`
  color: red;
  margin-top: -45px;
`;
