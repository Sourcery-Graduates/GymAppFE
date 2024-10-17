import '@/App.scss';
import ErrorPage from '@/app/errorPage/ErrorPage';
import Home from '@/app/home/Home';
import Layout from '@/app/layout/Layout';
import MyTraining from '@/app/myTraining/MyTraining';
import Options from '@/app/options/Options';
import Training from '@/app/training/Training';
import { AppRoutes } from '@/types/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyProfile from '@/app/myProfile/MyProfile';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.HOME} element={<Layout />}>
					<Route path={AppRoutes.HOME} element={<Home />} />
					<Route path={AppRoutes.TRAINING} element={<Training />} />
					<Route path={AppRoutes.MY_TRAINING} element={<MyTraining />} />
					<Route path={AppRoutes.OPTIONS} element={<Options />} />
					<Route path={AppRoutes.MY_PROFILE} element={<MyProfile />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
