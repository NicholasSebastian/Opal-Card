import { FC, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { serverUrl } from "../index";
import Container from "../components/Container";
import Selector from "../components/Selector";
import Button from "../components/Button";
import { ICard } from './ViewCards';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface IResult {
  distance: number
  rate: number
}

interface IDisplayProps {
  label: string
  value: any
}

const DisplayValue: FC<IDisplayProps> = props => {
  if (props.value !== undefined) {
    return (
      <div>
        <h4>{props.label}:</h4>
        <span>{props.value}</span>
      </div>
    );
  }
  return <Fragment />
}

const RecordTrip: FC = () => {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  const [stations, setStations] = useState<Array<string>>([]);
  const [cards, setCards] = useState<Array<ICard>>([]);
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [card, setCard] = useState<ICard>();
  const [result, setResult] = useState<IResult>();
  
  useEffect(() => {
    fetch(serverUrl + '/api/stations')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(console.error);

    fetch(serverUrl + '/api/cards?user=' + user)
      .then(response => response.json())
      .then(data => {
        setCards(data);
        if (data.length > 0) {
          setCard(data[0]);
        }
      })
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (from === to) {
      setResult(undefined);
    }
    else if (from && to) {
      const fromIndex = stations.indexOf(from);
      const toIndex = stations.indexOf(to);

      fetch(serverUrl + `/api/calculate-price?from=${fromIndex}&to=${toIndex}`)
        .then(response => response.json())
        .then(data => setResult(data))
        .catch(console.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  function HandlePurchase() {
    fetch(serverUrl + '/api/transact-trip', {
      method: 'POST',
      body: JSON.stringify({ 
        cardnumber: card?.cardnumber, 
        from, 
        to, 
        price: result?.rate 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => navigate('/view-trips'))
    .catch(console.error);
  }

  return (
    <Container width={800}>
      <Wrapper>
        <Selector leftScroll
          name="From" items={stations} 
          value={from} setValue={setFrom} />
        <section>
          <DisplayValue label="From" value={from} />
          <DisplayValue label="To" value={to} />
          <DisplayValue label="Distance" 
            value={result ? result.distance + 'km' : undefined} />
          <DisplayValue label="Price" 
            value={result ? '$' + result.rate.toFixed(2) : undefined} />
          {result && (
            <Fragment>
              <select value={card?.cardnumber} 
                onChange={e => setCard(
                  cards.find(card => card.cardnumber.toString() === e.target.value)
                )}>
                {cards.map((card, i) => (
                  <option key={i} value={card.cardnumber}>
                    {card.cardnumber} - {card.cardname}
                  </option>
                ))}
              </select>
              <Button onClick={HandlePurchase}>Buy Trip</Button>
              {card && (
                <div>
                  <b>Current Balance:</b>
                  <span>{'$' + card.balance.toFixed(2)}</span>
                </div>
              )}
            </Fragment>
          )}
        </section>
        <Selector 
          name="To" items={stations} 
          value={to} setValue={setTo} />
      </Wrapper>
    </Container>
  );
}

export default RecordTrip;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;

  > section {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
      margin: 0;
    }

    span {
      display: block;
      margin-bottom: 20px;
    }

    select {
      cursor: pointer;
      padding: 5px 10px;
      margin: 10px 0;
    }

    > button + div {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
`;
