import { FC } from 'react';
import styled from 'styled-components';

interface IProps {
  name: string
  items: Array<string>
  value: string | undefined
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  leftScroll?: boolean
}

interface IStyleProps {
  height: number
  leftScroll?: boolean
}

const Selector: FC<IProps> = props => {
  return (
    <Wrapper height={400} leftScroll={props.leftScroll}>
      {props.items.map((item, i) => (
        <label>
          <input type='radio' 
            name={props.name} value={item} key={i}
            checked={item === props.value} 
            onChange={e => props.setValue(e.target.value)} />
          <span>{item}</span>
        </label>
      ))}
    </Wrapper>
  );
}

export default Selector;

const Wrapper = styled.div<IStyleProps>`
  width: 200px;
  max-height: ${props => props.height + 'px'};
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  direction: ${props => props.leftScroll ? 'rtl' : 'ltr'};
  
  > label {
    cursor: pointer;
    direction: ${props => props.leftScroll ? 'ltr' : 'rtl'};
    font-size: 14px;

    > input {
      display: none;

      :checked + span {
        background-color: #D34F73;
        display: block;
        transition: background 200ms;
      }
    }

    > span {
      display: block;
      width: 100%;
      padding: 3px 8px;
    }
  }
`;
