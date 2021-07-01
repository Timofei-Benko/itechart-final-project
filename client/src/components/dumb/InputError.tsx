import styled from 'styled-components/macro';

// @ts-ignore
export default styled.div`
  position: relative;
  height: 40px;
  visibility: ${(props: { errorDisplay?: boolean }) => props.errorDisplay ? 'visible' : 'hidden'};

  :before {
    content: '${(props: { errorMessage?: string }) => props.errorMessage}';
    position: absolute;
    top: 5px;
    display: block;
    color: #cf6c6c;
    font-size: .8rem;
    font-style: italic;
  }
`;
