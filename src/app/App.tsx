import '@/App.scss';
import ErrorPage from '@/app/errorPage/ErrorPage';
import Home from '@/app/home/Home';
import Layout from '@/app/layout/Layout';
import MyTraining from '@/app/myTraining/MyTraining';
import Options from '@/app/options/Options';
import Routines from '@/app/routines/Routines';
import { AppRoutes } from '@/types/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyProfile from '@/app/myProfile/MyProfile';

import RoutineDetails from './routines/routineDetails/RoutineDetails';
import RoutineCreate from './routines/routineForm/routineCreate/RoutineCreate';
import RoutineUpdate from './routines/routineForm/routineUpdate/RoutineUpdate';
import WorkoutCreate from '@/app/myTraining/workout/createWorkout/CreateWorkout.tsx';
import WorkoutPage from '@/app/myTraining/workout/workout/WorkoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Layout />}>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.ROUTINES} element={<Routines />} />
          <Route path={AppRoutes.WORKOUT_CREATE} element={<WorkoutCreate />} />
          <Route path={AppRoutes.ROUTINE_DETAILS} element={<RoutineDetails />} />
          <Route path={AppRoutes.ROUTINE_UPDATE} element={<RoutineUpdate />} />
          <Route path={AppRoutes.ROUTINE_CREATE} element={<RoutineCreate />} />
          <Route path={AppRoutes.MY_TRAINING} element={<MyTraining />} />
          <Route path={AppRoutes.WORKOUT} element={<WorkoutPage />} />
          <Route path={AppRoutes.OPTIONS} element={<Options />} />
          <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
