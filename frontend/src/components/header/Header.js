import styled from 'styled-components';
import backgroundVideo from '../assets/Video.mp4';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Wrapper>
      <TitleContainer>
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

const LargeTitle = styled.span`
  position: absolute;
  top: 18%;
  left: 10%;
  font-size: 100px;
`;

const ExploreContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  top: 54%;
  left: 10.5%;
  position: absolute;
`;

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
