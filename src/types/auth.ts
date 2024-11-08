export interface AuthState {
  isLoggedIn: boolean;
  logOutUser: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
}
