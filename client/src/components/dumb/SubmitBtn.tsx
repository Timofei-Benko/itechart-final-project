import styled from 'styled-components/macro';

export default styled.input`
  width: 100%;
  padding: 11px 13px;
  background-color: transparent;
  box-shadow: 4px 4px 0 gray;
  margin: 2rem 0 1rem;
  outline: 0;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  transition: all .1s ease-in-out;

  :is(:hover, :focus) {
    transform: translateY(4px) translateX(4px);
    box-shadow: none;
    cursor: pointer;
  }
  
  :focus {
    background-color: rgba(162, 241, 162, 0.67);
  }
`;
