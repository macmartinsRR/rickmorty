import React, { useContext, useState } from "react";

const LoginContext = React.createContext();
const LoginUpdateContext = React.createContext();

// Make themes accessible for children

export function useLogin() {
  return useContext(LoginContext);
}

export function useLoginUpdate() {
  return useContext(LoginUpdateContext);
}

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={loggedIn}>
      <LoginUpdateContext.Provider value={setLoggedIn}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  );
}
