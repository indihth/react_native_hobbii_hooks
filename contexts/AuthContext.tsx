import { createContext, useContext, PropsWithChildren, useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { IAuthContext } from "@/types";

interface AuthContextType {
  authUserId: string | null;
  setAuthUserId: (id: string) => void;
  signIn: (data: { token: string; user_id: string }) => void;
  signOut: () => void;
  session: any;
  isLoading: boolean;
  isLoadingId: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// this hook can be used to access the session info
export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider>");
    }
  }

  return value as IAuthContext; // solves e:any type issue
}

// hook to set and access the id of the authenticated user
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingId, authUserId], setAuthUserId] =
    useStorageState("authUserId");

  return (
    <AuthContext.Provider
      value={{
        // Takes token from login and saves in Session - local or else depending on platform
        signIn: (data: { token: string; user_id: string }) => {
          setSession(data.token);
          // also sets logged in user id
          setAuthUserId(data.user_id);
        },
        // Removes token from storage
        signOut: () => {
          setSession(null);
          setAuthUserId(null);
        },
        session,
        isLoading,
        isLoadingId,
        authUserId,
        setAuthUserId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
