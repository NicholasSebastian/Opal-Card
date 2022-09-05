import { FC, createContext, useState, useContext, PropsWithChildren } from 'react';
import { serverUrl } from '../index';

interface IContext {
  user: string | undefined
  Login: (email: string, password: string) => Promise<boolean>
  Register: (email: string, password: string) => Promise<boolean>
  Logout: () => void
}

const AuthContext = createContext<IContext | undefined>(undefined);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>(
    // Stupid and hackable. But fuck it.
    sessionStorage.getItem("email") ?? undefined
  );

  async function Login(email: string, password: string) {
    const response = await fetch(serverUrl + '/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setUser(email);
      
      // Stupid and hackable. But fuck it.
      sessionStorage.setItem("email", email);
    }
    return authenticated as boolean;
  }

  function Logout() {
    setUser(undefined);
    sessionStorage.removeItem("email");
  }

  async function Register(email: string, password: string) {
    const response = await fetch(serverUrl + '/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success as boolean;
  }

  return (
    <AuthContext.Provider value={{ user, Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider };
export default useAuth;
