import React from 'react';
import styled from 'styled-components';
import Map from '../../pages/Map';

export default function Posting() {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 50px;
`;
