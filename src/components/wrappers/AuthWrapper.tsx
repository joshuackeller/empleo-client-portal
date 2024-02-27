import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../shadcn/Dialog";
import RequestLinkForm from "../auth/RequestLinkForm";

const AUTH_TOKEN = "AUTH_TOKEN";

interface AuthContextProps {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
} as AuthContextProps);

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localToken = localStorage.getItem(AUTH_TOKEN);
      if (localToken) {
        setToken(localToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, setAuthModalOpen: setOpen }}
    >
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Get Started</DialogTitle>
            <DialogDescription>
              Enter your email to get a secure link
            </DialogDescription>
          </DialogHeader>
          <RequestLinkForm />
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
