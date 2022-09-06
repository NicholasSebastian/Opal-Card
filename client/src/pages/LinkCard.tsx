import { FC, useState } from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import Button from "../components/Button";
import Message, { IMessage } from "../components/Message";
import { serverUrl } from "../index";
import useAuth from "../hooks/useAuth";

function validateNumeric(value: string, callback: (v: string) => void) {
  const valid = (value.length === 0) || /^\d+$/.test(value);
  if (valid && value.length < 10) {
    callback(value);
  }
}

const LinkCard: FC = () => {
  const { user } = useAuth()!;
  const [cardnumber, setCardnumber] = useState("");
  const [cardname, setCardname] = useState("");
  const [message, setMessage] = useState<IMessage>();

  async function HandleCardLink() {
    const response = await fetch(serverUrl + '/api/link-card', {
      method: 'POST',
      body: JSON.stringify({ 
        cardnumber: parseInt(cardnumber), 
        cardname, 
        email: user 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      setCardnumber("");
      setCardname("");
      setMessage({ message: "Card linked successfully.", positive: true });
    }
    else {
      setMessage({ message: "Error. Unable to link the card." });
    }
  }

  return (
    <Container width={600}>
      <Form>
        <h2>Link Card</h2>
        {message && (
          <Message positive={message.positive}>
            {message.message}
          </Message>
        )}
        <div>
          <label>Card Number</label>
          <input 
            value={cardnumber}
            onChange={e => validateNumeric(e.target.value, v => setCardnumber(v))} />
        </div>
        <div>
          <label>Card Name</label>
          <input
            value={cardname}
            onChange={e => setCardname(e.target.value)} />
        </div>
        <Button type='button' onClick={HandleCardLink}>Link</Button>
      </Form>
    </Container>
  );
}

export default LinkCard;
