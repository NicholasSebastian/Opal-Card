import { FC } from "react";
import { BrowserRouter, Routes as AllRoutes, Route } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import ProtectRoute from "./ProtectedRoute";
import NavBar from './NavBar';
import Home from "../pages/Home";
import LoginRegister from '../pages/LoginRegister';
import ViewAccount from "../pages/ViewAccount";
import ViewCards from '../pages/ViewCards';
import LinkCard from '../pages/LinkCard';
import RecordTrip from "../pages/RecordTrip";
import ViewSavedTrips from "../pages/ViewSavedTrips";
import NotFound from "../pages/404";

const ProtectedViewCards = ProtectRoute(ViewCards);
const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedRecordTrip = ProtectRoute(RecordTrip);
const ProtectedViewSavedTrips = ProtectRoute(ViewSavedTrips);
const ProtectedViewAccount = ProtectRoute(ViewAccount);

const Routes: FC = () => {
  const { user } = useAuth()!;
  return (
    <BrowserRouter>
      <NavBar />
      <AllRoutes>
        <Route index element={user ? <Home /> : <LoginRegister />} />
        <Route path='/view-cards' element={<ProtectedViewCards />} />
        <Route path='/link-card' element={<ProtectedLinkCard />} />
        <Route path='/record-trip' element={<ProtectedRecordTrip />} />
        <Route path='/view-trips' element={<ProtectedViewSavedTrips />} />
        <Route path='/account' element={<ProtectedViewAccount />} />
        <Route path='*' element={<NotFound />} />
      </AllRoutes>
    </BrowserRouter>
  );
}

export { useAuth };
export default Routes;
