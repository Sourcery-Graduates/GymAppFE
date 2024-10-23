import { useContext } from 'react';
import { AuthContext } from '@/app/common/context/AuthContext';
import { AuthState } from '@/app/common/context/types';

const useAuth = (): AuthState => useContext(AuthContext);
export default useAuth;
