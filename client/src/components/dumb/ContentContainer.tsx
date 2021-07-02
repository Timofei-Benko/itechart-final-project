import styled from 'styled-components/macro';

const ContentContainer = styled.div`
  display: flex;
  min-height: ${(props: { height?: string | undefined }) => props.height };
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export default ContentContainer;
