import Post from '../post/Post';
import styled from 'styled-components';

export default function Posts({ posts }) {
  return (
    <Wrapper className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
`;
