import React from 'react';
import styled from 'styled-components';
import SinglePost from '../../components/singlePost/SinglePost';

export default function Single() {
  return (
    <Wrapper>
      <SinglePost />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
