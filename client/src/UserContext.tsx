import { createContext } from 'react';

interface userInterface {
  user: any;
  setUser: any;
}

export const UserContext = createContext<Partial<userInterface>>({});
