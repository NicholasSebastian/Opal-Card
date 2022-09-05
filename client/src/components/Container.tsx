import styled from "styled-components";

interface IContainerProps {
  width: number
  marginTop?: number
  marginBottom?: number
}

const Container = styled.div<IContainerProps>`
  background-color: #3F292B;
  color: #FFF;
  width: ${props => props.width + 'px'};
  margin-top: ${props => (props.marginTop ?? 0) + 'px'};
  margin-bottom: ${props => (props.marginBottom ?? 0) + 'px'};
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
`;

export default Container;
