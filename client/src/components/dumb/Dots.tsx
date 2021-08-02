import React from 'react';
import styled from 'styled-components/macro';

const DotsWrap = styled.div`
  height: 10px;
  width: 10px;
`;

const Dots = (): JSX.Element => {
  return (
    <DotsWrap>
      <span>...</span>
    </DotsWrap>
  );
};

export default Dots;
