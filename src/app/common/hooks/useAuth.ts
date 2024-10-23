import { useContext } from 'react';
import { AuthContext } from '@/app/common/context/AuthContext';
import { AuthState } from '@/types/auth';

const useAuth = (): AuthState => useContext(AuthContext);
export default useAuth;
