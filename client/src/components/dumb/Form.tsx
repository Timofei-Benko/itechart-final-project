import styled from 'styled-components/macro';
import { BOX_SHADOW } from '../constants';

export default styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 2rem;
  background: white;
  padding: 0 3rem 1rem 3rem;
  border-radius: 4px;
  box-shadow: ${BOX_SHADOW};
`;
