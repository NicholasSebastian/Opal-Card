import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./Routes";
import Container from "./Container";
import Button from "./Button";

const NavBar: FC = () => {
  const { user } = useAuth()!;
  return (
    <Container width={850} marginTop={10} marginBottom={20}>
      <Wrapper>
        <h1>Opal Card Manager</h1>
        {(user !== undefined) && (
          <nav>
            <Link to='/'><Button>View Account</Button></Link>
            <Link to='/view-cards'><Button>View Cards</Button></Link>
            <Link to='/link-card'><Button>Link Card</Button></Link>
            <Link to='/record-trip'><Button>Record Trip</Button></Link>
            <Link to='/view-trips'><Button>View Saved Trips</Button></Link>
          </nav>
        )}
      </Wrapper>
    </Container>
  );
}

export default NavBar;

const Wrapper = styled.div`
  padding: 20px 100px;

  h1 {
    margin: 0;
  }

  nav {
    margin-top: 10px;
    display: flex;

    > * {
      margin-right: 5px;
    }
  }
`;
