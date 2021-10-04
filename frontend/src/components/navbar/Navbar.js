import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Navbar() {
  const publicFolder = 'http://localhost:8800/images/';
  const { user, dispatch } = useContext(Context);
  // const user = false;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Wrapper>
      <NavbarLeft>
        <Link to="/" className="link">
          The Traveler
        </Link>
      </NavbarLeft>
      {/* <NavbarCenter>
        <Lists></Lists>
      </NavbarCenter> */}
      {/* <ListItem onClick={handleLogout}>{user && 'LOGOUT'}</ListItem> */}
      <NavbarRight className="dot">
        <ListItem>
          <Link to="/" className="link">
            Home
          </Link>
        </ListItem>
        <PostItem>
          <Link to="/posting" className="link">
            Post
          </Link>
        </PostItem>
        {user ? (
          <Link to="/settings">
            <Avatar>
              <Image src={publicFolder + user.profileAvatar} alt="" />
            </Avatar>
          </Link>
        ) : (
          <Lists>
            <ListItem>
              <Link to="/login" className="link">
                Sign In
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/register" className="link">
                Register
              </Link>
            </ListItem>
          </Lists>
        )}
        {/* <i className="navbarSearchIcon fas fa-search"></i> */}
        <ListItem onClick={handleLogout}>
          {user && <Logout>Logout</Logout>}
        </ListItem>
      </NavbarRight>
      {/* <NavbarLogout onClick={handleLogout}>
        {user && <Logout>Logout</Logout>}
      </NavbarLogout> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 60px;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Josefin Sans', sans-serif;
  z-index: 999;
  box-shadow: 0 1rem 8rem 0 rgba(0, 0, 0, 0.2);
`;
// transform: translate(-50%, -50%);
// flex: 1;

const NavbarLeft = styled.div`
  margin-left: 150px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    color: #0083a3;
  }
`;

// flex: 1;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
  margin-bottom: 10px;
  margin-top: 10px;

  transition: 0.5s;

  &:after {
    position: absolute;
    content: '';
    top: 100%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #d5d7d8;
    transform: scaleX(5);
    transform-origin: right;
    transition: transform 0.5s;
  }

  &:hover {
    color: #95a5a6;
  }
`;

// const NavbarLogout = styled.div`
//   font-size: 18px;
//   font-weight: 300;
//   cursor: pointer;
// `;

// margin-right: 50px;
const Logout = styled.div`
  margin-left: 30px;
`;

// const Icon = styled.div`
// font-size: 20px;
// margin-right: 10px;
// color: #444;
// cursor: pointer;
// `;

// 0% { border-color: hsl(0, 100%, 50%); }
//   25% { border-color: hsl(90, 100%, 50%); }
//   50% { border-color: hsl(180, 100%, 50%); }
//   75% { border-color: hsl(270, 100%, 50%); }
//   100% { border-color: hsl(360, 100%, 50%); }

const AvatarAnimated = keyframes`
0% {
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
}
50% {
  -webkit-transform: translateY(-4px);
  transform: translateY(-4px);
}
100% {
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
}
`;

const Avatar = styled.div`
  animation: ${AvatarAnimated} 5s infinite;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;

// const NavbarCenter = styled.div`
//   flex: 6;
// `;

const Lists = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  list-style: none;

  &:hover {
    color: #0083a3;
  }
`;

// display: flex;
// justify-content: flex-end;
const PostItem = styled.li`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  list-style: none;

  &:hover {
    color: #0083a3;
  }
`;
