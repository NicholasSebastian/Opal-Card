import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Button from "../components/Button";

const NotFound: FC = () => {
  return (
    <Container width={400}>
      <Wrapper>
        <h2>Page Not Found</h2>
        <Link to='/'>
          <Button>Return to Home Page</Button>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default NotFound;

const Wrapper = styled.div`
  padding: 24px;
  text-align: center;

  > h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;
