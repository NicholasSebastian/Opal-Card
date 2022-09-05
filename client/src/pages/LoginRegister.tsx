import { FC, useState } from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import Button from "../components/Button";
import Message, { IMessage } from "../components/Message";
import useAuth from "../hooks/useAuth";

const LoginRegister: FC = () => {
  const { Login, Register } = useAuth()!;

  // States.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<IMessage>();

  // Handles the login button click.
  async function HandleLogin() {
    const success = await Login(email, password);
    if (!success) {
      setMessage({ message: "Invalid email or password." });
    }
  }

  // Handles the register button click.
  async function HandleRegister() {
    const success = await Register(email, password);
    if (success) {
      setEmail("");
      setPassword("");
      setMessage({ message: "Account registered successfully.", positive: true });
    }
    else {
      setMessage({ message: "Error. Unable to register the account." });
    }
  }
  
  return (
    <Container width={600}>
      <Form>
        <h2>Login / Register</h2>
        {message && (
          <Message positive={message.positive}>
            {message.message}
          </Message>
        )}
        <div>
          <label>Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <Button 
            type='button' 
            onClick={HandleLogin}>Login</Button>
          <Button 
            type='button' 
            onClick={HandleRegister}>Register</Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginRegister;
