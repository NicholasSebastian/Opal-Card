import styled from 'styled-components';

interface IProps {
  positive?: boolean
}

interface IMessage extends IProps {
  message: string
}

const Message = styled.div<IProps>`
  background-color: ${props => props.positive ? '#BBC7A4' : '#DB7F67'};
  color: ${props => props.positive ? '#000' : '#FFF'};
  padding: 5px 10px;
  border-radius: 2px;
  font-size: 12px;
`;

export type { IMessage };
export default Message;
