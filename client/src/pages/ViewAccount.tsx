import { FC, useState } from "react";
import useAuth from "../hooks/useAuth";
import Container from "../components/Container";
import Form from "../components/Form";
import Button from "../components/Button";
import Message, { IMessage } from "../components/Message";
import { serverUrl } from "../index";

const ViewAccount: FC = () => {
  const { user, Logout } = useAuth()!;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<IMessage>();
  // Under normal circumstances, you would query for the account
  // data in useEffect at the beginning of the component lifecycle,
  // set it into state, then render it onto the component.
  // But since we are only displaying the email for now, which is
  // already inside the useAuth data, we'll just take that for now.

  async function HandleUpdate() {
    const response = await fetch(serverUrl + "/api/modify-account", {
      method: 'PUT',
      body: JSON.stringify({ email: user, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { success } = await response.json();
    if (success) {
      setPassword("");
      setMessage({ message: "Account details successfully updated.", positive: true });
    }
    else {
      setMessage({ message: "Something went wrong. Just like your life." });
    }
  }

  return (
    <Container width={500}>
      <Form>
        {message && (
          <Message positive={message.positive}>
            {message.message}
          </Message>
        )}
        <div>
          <label>Email</label>
          <input value={user} disabled />
        </div>
        <div>
          <label>Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
        </div>
        <Button type='button' onClick={HandleUpdate}>Update Account Details</Button>
        <hr style={{ width: '80%', opacity: 0.3 }} />
        <Button type='button' onClick={Logout}>Logout</Button>
      </Form>
    </Container>
  );
}

export default ViewAccount;
