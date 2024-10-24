export interface LoginInResponse {
  token: string;
}

export interface RegisterBody {
  username: string;
  password: string;
  email: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logOutUser: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
