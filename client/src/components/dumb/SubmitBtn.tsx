import styled from "styled-components";

export default styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background-color: transparent;
  box-shadow: 4px 4px 0 coral;
  margin: 2rem 0 1rem;
  outline: 0;
  border: 1px solid rgba(47, 45, 45, 0.7);
  font-weight: bold;
  color: #d26841;

  :hover {
    transform: translateY(4px) translateX(4px);
    box-shadow: none;
    cursor: pointer;
  }

  :focus {
    background-color: #a2f1a2;
  }
`