import styled from 'styled-components';

const Button = styled.button`
  background-color: #D34F73;
  color: #FFF;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-weight: 500;

  :hover {
    cursor: pointer;
    background-color: #DB7F67;
    transition: background 200ms;
  }
`;

export default Button;
