import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import useAuth from "../hooks/useAuth";
import { serverUrl } from "../index";

interface ICard {
  cardnumber: number
  cardname: string
  balance: number
}

const ViewCard: FC = () => {
  const { user } = useAuth()!;
  const [cards, setCards] = useState<Array<ICard>>();

  useEffect(() => {
    fetch(serverUrl + "/api/cards?user=" + user)
      .then(response => response.json())
      .then(cards => setCards(cards))
      .catch(console.error);
  }, [user]);

  if (Array.isArray(cards)) {
    return (
      <Container width={700}>
        {cards.length === 0 ? (
          <MidText>You currently have no cards.</MidText>
        ) : (
          <Table>
            <tbody>
              {cards.map((card, i) => (
                <tr key={i}>
                  <td>{card.cardnumber}</td>
                  <td>{card.cardname}</td>
                  <td>{'$' + card.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }
  return <div style={{ textAlign: "center" }}>Loading...</div>;
}

export type { ICard };
export default ViewCard;

const Table = styled.table`
  padding: 20px;

  td {
    width: 200px;
    text-align: center;
  }
`;

const MidText = styled.span`
  display: block;
  text-align: center;
  padding: 20px 0;
`;
