import '@/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthenticatedLayout from '@/app/layout/authenticatedLayout/AuthenticatedLayout';
import NotAuthenticatedLayout from '@/app/layout/notAuthenticatedLayout/NotAuthenticatedLayout';
import ErrorPage from '@/app/pages/errorPage/ErrorPage';
import Exercises from '@/app/pages/exercises/Exercises';
import Home from '@/app/pages/home/Home';
import MyProfile from '@/app/pages/myProfile/MyProfile';
import MyTraining from '@/app/pages/myTraining/MyTraining';
import CreateWorkoutPage from '@/app/pages/myTraining/workout/createWorkout/CreateWorkoutPage';
import WorkoutPage from '@/app/pages/myTraining/workout/workout/WorkoutPage';
import Options from '@/app/pages/options/Options';
import PasswordChange from '@/app/pages/passwordChange/PasswordChange';
import RegisterVerification from '@/app/pages/registerVerification/RegisterVerification';
import RoutineDetails from '@/app/pages/routines/routineDetails/RoutineDetails';
import RoutineCreate from '@/app/pages/routines/routineForm/routineCreate/RoutineCreate';
import RoutineUpdate from '@/app/pages/routines/routineForm/routineUpdate/RoutineUpdate';
import Routines from '@/app/pages/routines/Routines';
import { AppRoutes } from '@/types/routes';
import useAuth from '@/app/common/hooks/useAuth.ts';
import ForgotPasswordPage from '@/app/pages/forgotPasswordPage/ForgotPasswordPage.tsx';
import RegisterPage from '@/app/pages/registerPage/RegisterPage.tsx';
import LoginPage from '@/app/pages/loginPage/LoginPage.tsx';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route element={<AuthenticatedLayout />}>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.ROUTINES} element={<Routines />} />
            <Route path={AppRoutes.WORKOUT_CREATE} element={<CreateWorkoutPage />} />
            <Route path={AppRoutes.ROUTINE_DETAILS} element={<RoutineDetails />} />
            <Route path={AppRoutes.ROUTINE_UPDATE} element={<RoutineUpdate />} />
            <Route path={AppRoutes.ROUTINE_CREATE} element={<RoutineCreate />} />
            <Route path={AppRoutes.MY_TRAINING} element={<MyTraining />} />
            <Route path={AppRoutes.WORKOUT} element={<WorkoutPage />} />
            <Route path={AppRoutes.OPTIONS} element={<Options />} />
            <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
            <Route path={AppRoutes.EXERCISES} element={<Exercises />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        ) : (
          <Route element={<NotAuthenticatedLayout />}>
            <Route path="*" element={<LoginPage />} />
            <Route path={AppRoutes.HOME} element={<LoginPage />} />
            <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
            <Route path={AppRoutes.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={AppRoutes.REGISTRATION_VERIFICATION} element={<RegisterVerification />} />
            <Route path={AppRoutes.PASSWORD_CHANGE} element={<PasswordChange />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
