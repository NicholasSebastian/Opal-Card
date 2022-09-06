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
        <Link to='/'><h1>Opal Card Manager</h1></Link>
        {(user !== undefined) && (
          <nav>
            <Link to='/view-cards'><Button>View Cards</Button></Link>
            <Link to='/link-card'><Button>Link Card</Button></Link>
            <Link to='/record-trip'><Button>Record Trip</Button></Link>
            <Link to='/view-trips'><Button>View Saved Trips</Button></Link>
            <Link to='/account'><Button>My Account</Button></Link>
          </nav>
        )}
      </Wrapper>
    </Container>
  );
}

export default NavBar;

const Wrapper = styled.div`
  padding: 20px 100px;

  a, h1 {
    color: #FFF;
    margin: 0;
    text-decoration: none;
  }

  nav {
    margin-top: 10px;
    display: flex;

    > * {
      margin-right: 5px;
    }
  }
`;
