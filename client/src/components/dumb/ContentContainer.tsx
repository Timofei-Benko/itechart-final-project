import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  min-height: ${ (props: { outer?: boolean, inner?: boolean }) => (props.outer && '100vh') || (props.inner && '100%') };
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export default ContentContainer;
