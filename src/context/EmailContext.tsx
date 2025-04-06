import {
  createContext,
  useMemo,
  useState,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type EmailContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailContext = createContext<EmailContextType>({} as EmailContextType);

export const useEmailContext = () => useContext(EmailContext);

export const EmailContextTypeProvider = ({ children }: PropsWithChildren) => {
  const [email, setEmail] = useState("");

  const value = useMemo(
    () => ({
      email,
      setEmail,
    }),
    [email, setEmail]
  );

  return <EmailContext value={value}>{children}</EmailContext>;
};
