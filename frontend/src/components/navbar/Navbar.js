import React from 'react';
import styled from 'styled-components';
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
      <NavbarCenter>
        <Lists>
          <ListItem>
            {/* <Link to="/" className="link">
              Home
            </Link> */}
          </ListItem>

          <ListItem>
            <Link to="/posting" className="link">
              Post
            </Link>
          </ListItem>
        </Lists>
      </NavbarCenter>
      {/* <ListItem onClick={handleLogout}>{user && 'LOGOUT'}</ListItem> */}
      <NavbarRight>
        {user ? (
          <Link to="/settings">
            <Image src={publicFolder + user.profileAvatar} alt="" />
          </Link>
        ) : (
          <Lists>
            <ListItem>
              <Link to="/login" className="link">
                Login
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
      </NavbarRight>
      <NavbarLogout onClick={handleLogout}>
        {user && <Logout>Logout</Logout>}
      </NavbarLogout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  font-family: 'Josefin Sans', sans-serif;
  z-index: 999;
`;

const NavbarLeft = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarLogout = styled.div`
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
`;

const Logout = styled.div`
  margin-right: 50px;
  margin-left: -190px;
`;

// const Icon = styled.div`
// font-size: 20px;
// margin-right: 10px;
// color: #444;
// cursor: pointer;
// `;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const NavbarCenter = styled.div`
  flex: 6;
`;

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
`;
