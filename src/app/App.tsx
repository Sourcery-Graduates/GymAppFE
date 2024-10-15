import "@/App.scss";
import ErrorPage from "@/app/errorPage/ErrorPage";
import Home from "@/app/home/Home";
import Layout from "@/app/layout/Layout";
import MyTraining from "@/app/myTraining/MyTraining";
import Options from "@/app/options/Options";
import Routines from "@/app/routines/Routines";
import { AppRoutes } from "@/types/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Layout />}>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.ROUTINES} element={<Routines />} />
          <Route path={AppRoutes.MY_TRAINING} element={<MyTraining />} />
          <Route path={AppRoutes.OPTIONS} element={<Options />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
