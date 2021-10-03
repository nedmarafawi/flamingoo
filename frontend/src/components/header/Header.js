import styled from 'styled-components';

export default function Header() {
  return (
    <Wrapper>
      <TitleContainer>
        {/* <SmallTitle>Mini title</SmallTitle> */}
        {/* <LargeTitle>Travel</LargeTitle> */}
      </TitleContainer>
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lora', serif;
  color: #444;
`;

const SmallTitle = styled.span`
  position: absolute;
  top: 10%;
  font-size: 20px;
`;

const LargeTitle = styled.span`
  position: absolute;
  top: 10%;
  font-size: 100px;
`;

// const Image = styled.img`
//   width: 100%;
//   height: 450px;
//   margin-top: 130px;
//   object-fit: cover;
// `;
