import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { serverUrl } from "../index";

interface ITrip {
  id: number
  fromstation: string
  tostation: string
  cardnumber: number
  price: string
  datetime: string
}

const ViewSavedTrips: FC = () => {
  const [trips, setTrips] = useState<Array<ITrip>>([]);
  useEffect(() => {
    fetch(serverUrl + '/api/trips')
      .then(response => response.json())
      .then(data => setTrips(data))
      .catch(console.error);
  }, []);

  return (
    <Container width={940}>
      <Table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start</th>
            <th>Destination</th>
            <th>Card Number</th>
            <th>Amount Paid</th>
            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, i) => (
            <tr key={i}>
              <td>{trip.id}</td>
              <td>{trip.fromstation}</td>
              <td>{trip.tostation}</td>
              <td>{trip.cardnumber}</td>
              <td>{trip.price}</td>
              <td>{new Date(trip.datetime).toUTCString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ViewSavedTrips;

const Table = styled.table`
  margin: 0 auto;
  padding: 20px 0;
  border: none;

  tr {
    cursor: pointer;
    
    :not(thead > tr):hover {
      background-color: #D34F73;
      transition: background 300ms;
    }
  }

  th, td {
    padding: 4px 12px;
  }
`;
