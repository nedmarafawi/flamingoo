import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Map from '../../components/Map';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { Footer } from '../../components/Footer';

export default function Home({ post }) {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      // console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <FeatureCenter>
        <FeaturesTitle>Features</FeaturesTitle>
        <FeaturesContainer>
          <Link to={`/mapping`} className="link">
            <FeatureSubTitle>
              <HeaderTitle>Map</HeaderTitle>
              <Paragraph>
                Search from millions of locations available
                <br></br>
                and pin your travels on your very own digital
                <br></br>
                push pin travel map!
              </Paragraph>
            </FeatureSubTitle>
          </Link>
          <Link to={`/posting`} className="link">
            <FeatureSubTitle>
              <HeaderTitle>Post</HeaderTitle>
              <Paragraph>
                Search from millions of locations available
                <br></br>
                and pin your travels on your very own digital
                <br></br>
                push pin travel map!
              </Paragraph>
            </FeatureSubTitle>
          </Link>

          {/* <FeatureSubTitle>
            <HeaderTitle>Save</HeaderTitle>
            <Paragraph>
              Search from millions of locations available
              <br></br>
              and pin your travels on your very own digital
              <br></br>
              push pin travel map!
            </Paragraph>
          </FeatureSubTitle> */}
        </FeaturesContainer>
      </FeatureCenter>
      <Title>Discover The Most Attractive Places</Title>

      <ImageContainer>
        <ImageThree
          src="https://images.pexels.com/photos/4477407/pexels-photo-4477407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          atl=""
        />
        <ImageTitleOne>Iceland</ImageTitleOne>
        <ImageOne
          src="https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          atl=""
        />
        <Link to={`/post/615d14430607fa3db3fc8f12`} className="link">
          <ImageTitleTwo>Thailand</ImageTitleTwo>
        </Link>
        <ImageTwo
          src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&h=650&w=940"
          atl=""
        />
        <ImageTitleThree>Algeria</ImageTitleThree>
        <ImageOne
          src="https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          atl=""
        />
        <ImageTitleFour>Turkey</ImageTitleFour>
        <ImageThree
          src="https://images.pexels.com/photos/4161911/pexels-photo-4161911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          atl=""
        />
        <ImageTitleFive>Italy</ImageTitleFive>
      </ImageContainer>
      <MapTitle>Where will you pin next?!</MapTitle>
      <MapContainer>
        <Map />
      </MapContainer>
      <Wrapper>
        <PostsTitle>Create New Memories Around the World</PostsTitle>
        <Posts posts={posts} />
      </Wrapper>
      {/* <Footer /> */}
    </>
  );
}

const Wrapper = styled.div`
  min-height: 470vh;
  display: flex;
`;

// TODO: fix mobile size
const Title = styled.p`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 135%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  color: #063734;
`;

const PostsTitle = styled.p`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: #063734;
  top: 315%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const FeaturesTitle = styled.p`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 95%;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  color: #063734;
`;

const FeatureCenter = styled.div`
  flex: 1;
`;

const FeaturesContainer = styled.ul`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 110%;
  left: 25%;
`;

const FeatureSubTitle = styled.li`
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #adeaeb;
  border-radius: 0.5rem;

  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  &:hover {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
`;

const HeaderTitle = styled.h4`
  padding: 10px;
  color: #063734;
`;

const Paragraph = styled.p`
  word-wrap: break-word;
  padding: 20px;
  font-size: 14px;
`;

const FeatureMap = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 150%;
  z-index: 5;
`;

const ImageOne = styled.img`
  width: 13%;
  height: 5%;
  object-fit: cover;

  transform: translateY(3%);
  padding: 0.3rem 0.3rem;
  border-radius: 1rem;

  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  &:hover {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
`;
// transform: translateY(7%);
// padding: 0.25rem 0.5rem;
// border-radius: 1rem;
// cursor: pointer;
// overflow: hidden;

// transition: all 0.5s ease 0s;

// &:hover {
//   transform: scale(1.1);
// }

const ImageTwo = styled.img`
  width: 17%;
  height: 5%;
  object-fit: cover;

  transform: translateY(3%);
  padding: 0.3rem 0.3rem;
  border-radius: 1rem;

  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  &:hover {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
`;
// transform: translateY(3%);
// padding: 0.55rem 0.55rem;
// border-radius: 1rem;
// cursor: pointer;
// overflow: hidden;

// transition: all 0.5s ease 0s;

// &:hover {
//   transform: scale(1.1);
// }

const ImageThree = styled.img`
  width: 10%;
  height: 5%;
  object-fit: cover;

  transform: translateY(23%);
  padding: 0.3rem 0.3rem;
  border-radius: 1rem;

  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.2);

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  &:hover {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
`;
// transform: translateY(23%);
// padding: 0.55rem 0.55rem;
// border-radius: 1rem;
// cursor: pointer;
// overflow: hidden;

// transition: all 0.5s ease 0s;

// &:hover {
//   transform: scale(1.1);
// }

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 230%;
`;

const MapTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 218%;
  color: #063734;

  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;
// right: 34.5%;

// const ImageCard = styled.div`
//   top: 100%;
//   display: flex;
//   justify-content: center;
//   position: absolute;
//   width: 50%;
//   color: white;
// `;

// const ImageTitle = styled.div`
//   font-size: 10px;
// `;

// const ImageTitleContainer = styled.div`
//   z-index: 1;
//   color: black;
//   display: flex;
//   justify-content: center;
//   position: absolute;
//   left: 46%;
//   top: 60%;
// `;

const ImageCard = styled.div`
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 150%;
`;

const ImageTitleOne = styled.button`
  font-size: 12px;

  position: absolute;
  top: 65%;
  right: 75.1%;
  background-color: #edfdfb;
  color: #063734;
  padding-left: 20px;
  padding-right: 20px;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(3px);
  }
`;

const ImageTitleTwo = styled.button`
  font-size: 12px;

  position: absolute;
  top: 70%;
  right: 63%;
  background-color: #edfdfb;
  color: #063734;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 999;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(3px);
  }
`;

const ImageTitleThree = styled.button`
  font-size: 12px;
  position: absolute;
  top: 80%;
  right: 47.8%;
  background-color: #edfdfb;
  color: #063734;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 999;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(3px);
  }
`;

const ImageTitleFour = styled.button`
  font-size: 12px;
  position: absolute;
  top: 70%;
  right: 32.2%;
  background-color: #edfdfb;
  color: #063734;
  z-index: 999;
  padding-left: 20px;
  padding-right: 20px;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(3px);
  }
`;

const ImageTitleFive = styled.button`
  font-size: 12px;
  position: absolute;
  top: 65%;
  right: 20.5%;
  color: #063734;
  z-index: 999;
  background-color: #edfdfb;
  padding-left: 20px;
  padding-right: 20px;

  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: translateY(3px);
  }
`;
