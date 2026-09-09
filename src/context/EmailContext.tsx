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

const EmailContext = createContext<EmailContextType | null>(null);

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error("Email provider is missing");
  return context;
};

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
