import styled from "styled-components";
import { INPUT_HEIGHT } from '../constants';

// @ts-ignore
const Input = styled.input`
  position: relative;
  height: ${INPUT_HEIGHT};
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  margin-bottom: ${(props: {withError?: true}) => props.withError ? 0 : '2rem'};
  outline: 0;
  border: 1px solid;
  border-color: ${(props: {errorDisplay?: boolean}) => props.errorDisplay ? 'red' : 'rgba(201, 199, 199, 0.7)'};
  font-size: 14px;
  
  :focus,
  :hover {
    border-color: black;
  }

  ::placeholder {
    line-height: ${INPUT_HEIGHT};
  }

  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Input;
