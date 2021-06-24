import styled from 'styled-components';

export default styled.button`
  display: block;
  margin-right: 4px;
  padding: 5px;
  background-color: transparent;
  color: black;
  box-shadow: 4px 4px 0 gray;
  font-weight: bold;
  border: 1px solid lightgray;
  border-radius: 10px;
  transition: all .2s ease-in-out;

  :focus {
    outline: none;
    background-color: rgba(162, 241, 162, 0.67);
  }

  :is(:hover, :focus) {
    transform: translateY(4px) translateX(4px);
    box-shadow: none;
    cursor: pointer;
  }
`;
