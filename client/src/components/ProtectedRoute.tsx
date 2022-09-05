/* eslint-disable react-hooks/rules-of-hooks */
import { FC, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Routes';

function ProtectRoute<T extends object>(Component: ComponentType<T>): FC<T> {
  return (props) => {
    const { user } = useAuth()!;
    if (user !== undefined) {
      return <Component {...props as T} />
    }
    return <Navigate to="/" />
  }
}

export default ProtectRoute;
