import { createContext, useMemo, useState, PropsWithChildren, useContext } from "react";

type EmailContextType = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailContext = createContext<EmailContextType>({} as EmailContextType);

export const useEmailContext = () => useContext(EmailContext)

export const EmailContextTypeProvider = ({ children }: PropsWithChildren) => {
  const [email, setEmail] = useState("");

  const value = useMemo(
    () => ({
      email,
      setEmail,
    }),
    [email, setEmail]
  );

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};
