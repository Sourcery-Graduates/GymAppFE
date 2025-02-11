import './RegisterVerification.scss';
import { registerVerification } from '@/api/authentication';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import { AppRoutes } from '@/types/routes';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const RegisterVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const redirectTime = 10;
  const [timeLeft, setTimeLeft] = useState<number>(redirectTime);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      navigate(AppRoutes.HOME);
      console.log('xdd');
    }, redirectTime * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  const {
    data: responseText,
    error: responseError,
    isLoading,
  } = useQuery<string, AxiosError>({
    queryKey: ['registerVerification'],
    queryFn: () => registerVerification(token),
    enabled: !!token,
    retry: false,
  });

  return (
    <div className='register-verification-container'>
      {isLoading ? (
        <BasicSpinner />
      ) : (
        <>
          <h1>
            {responseError
              ? (responseError?.response?.data?.message ?? (responseError?.response?.data as string) ?? 'unkown error')
              : responseText}
          </h1>
          <h3>
            You will be redirected to login page in {timeLeft} second{timeLeft > 1 ? 's' : ''}...
          </h3>
        </>
      )}
    </div>
  );
};

export default RegisterVerification;
