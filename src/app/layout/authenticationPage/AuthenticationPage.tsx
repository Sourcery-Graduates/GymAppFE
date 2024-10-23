import { login, register } from '@/api/authentication';
import useAuth from '@/app/common/hooks/useAuth';
import { useState } from 'react';

const AuthenticationPage = () => {
  const { setIsLoggedIn } = useAuth();

  const [islogInForm, setIsLogInForm] = useState<boolean>(true);
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const onLogIn = async () => {
    login(username, password, stayLoggedIn)
      .then(() => {
        clearFields();
        setIsLoggedIn(true);
      })
      .catch();
  };

  const onRegister = () => {
    register(username, password, email)
      .then(() => {
        clearFields();
        setIsLogInForm(true);
      })
      .catch();
  };

  const clearFields = () => {
    setPassword('');
    setEmail('');
    setUsername('');
  };

  const handleFormSwitch = () => {
    clearFields();
    setIsLogInForm((islogInForm) => !islogInForm);
  };

  return (
    <>
      <div>username</div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <div>password</div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      {!islogInForm && (
        <>
          <div>email</div> <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </>
      )}
      {islogInForm && (
        <div>
          remember me
          <input
            type='checkbox'
            checked={stayLoggedIn}
            onChange={() => setStayLoggedIn((stayLoggedIn) => !stayLoggedIn)}
          />
        </div>
      )}
      <button onClick={islogInForm ? onLogIn : onRegister}>{islogInForm ? 'Log in' : 'Register'}</button>
      <div style={{ cursor: 'pointer' }} onClick={handleFormSwitch}>
        {!islogInForm ? 'Want to log in?' : 'Want to register?'}
      </div>
    </>
  );
};

export default AuthenticationPage;
