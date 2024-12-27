export interface IAuthContext {
    signIn: (token: string) => void;
    signOut: () => void;
    session: string | null;
    isLoading: boolean;
}
