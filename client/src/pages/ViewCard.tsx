import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import useAuth from "../hooks/useAuth";
import { serverUrl } from "../index";

const ViewCard: FC = () => {
  const { user } = useAuth()!;
  const [cards, setCards] = useState<Array<any>>();

  useEffect(() => {
    fetch(serverUrl + "/api/cards?user=" + user)
      .then(response => response.json())
      .then(cards => setCards(cards));
  }, [user]);

  if (Array.isArray(cards)) {
    return (
      <Container width={600}>
        <Table>
          <tbody>
            {cards.map(card => (
              <tr>
                {Object.entries(card).map(([key, value]) => (
                  <td>{value as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
  return <div style={{ textAlign: "center" }}>Loading...</div>;
}

export default ViewCard;

const Table = styled.table`
  padding: 20px;

  td {
    padding-right: 50px;
  }
`;
