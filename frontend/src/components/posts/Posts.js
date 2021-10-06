import Post from '../post/Post';
import styled from 'styled-components';

export default function Posts({ posts }) {
  return (
    <>
      <Wrapper className="posts">
        {posts.map((p) => (
          <Post post={p} />
        ))}
      </Wrapper>
    </>
  );
}

// flex: 9;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  top: 330%;
  padding-bottom: 400px;
`;
// z-index: 3;
// margin-top: 2300px;
// margin-bottom: 600px;
