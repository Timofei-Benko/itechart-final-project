import styled from 'styled-components';

export default styled.button`
  display: block;
  margin-right: 4px;
  padding: 5px;
  background-color: transparent;
  color: #d26841;
  border: 1px solid black;
  box-shadow: 4px 4px 0 coral;
  font-weight: bold;
  
  :hover {
    transform: translateY(4px) translateX(4px);
    box-shadow: none;
    cursor: pointer;
  }

  :focus {
    outline: none;
    background-color: #a2f1a2;
  }
`;
