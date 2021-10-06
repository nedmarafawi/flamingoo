import styled from 'styled-components';
import backgroundVideo from '../assets/video.mp4';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Wrapper>
      <TitleContainer>
        {/* <SmallTitle>Stories</SmallTitle> */}
        <LargeTitle>
          FlaminGoo
          <br></br>
          Travel Stories
        </LargeTitle>
      </TitleContainer>
      <BackgroundVideo>
        <video
          autoPlay
          loop
          muted
          style={{
            height: '85%',
            width: '100%',
            zIndex: '-1',
            position: 'absolute',
            objectFit: 'cover',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </BackgroundVideo>
      <Link to="/mapping" className="link">
        <ExploreContainer>
          <ExploreButton>Explore</ExploreButton>
        </ExploreContainer>
      </Link>
      {/* <Image
        src="https://lp-cms-production.imgix.net/2021-06/The_Colosseum_Rome.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850"
        alt=""
      /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 60px;
`;

const BackgroundVideo = styled.div`
  opacity: 1;
  margin-top: -125px;
  display: flex;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lora', serif;
  color: white;
  font-weight: 700;
`;

const SmallTitle = styled.span`
  position: absolute;
  top: 17%;
  left: 10.5%;
  font-size: 20px;
`;

const LargeTitle = styled.span`
  position: absolute;
  top: 18%;
  left: 10%;
  font-size: 100px;
`;

const ExploreContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  top: 50%;
  left: 10.5%;
  position: absolute;
`;
// margin-left: 70px;
// margin-bottom: -400px;

const ExploreButton = styled.button`
  font-size: 21px;
  outline: none;
  border: none;
  background-color: #0083a3;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 15px 0 15px 0;
  width: 150px;
  cursor: pointer;

  &:hover {
    background-color: #00647d;
  }
`;

// const Video = styled.video``;

// const Image = styled.img`
//   width: 100%;
//   height: 450px;
//   margin-top: 130px;
//   object-fit: cover;
// `;
