import { FC } from "react";
import { BrowserRouter, Routes as AllRoutes, Route } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import ProtectRoute from "./ProtectedRoute";
import NavBar from './NavBar';
import LoginRegister from '../pages/LoginRegister';
import ViewAccount from "../pages/ViewAccount";
import ViewCard from '../pages/ViewCard';
import LinkCard from '../pages/LinkCard';
import RecordTrips from "../pages/RecordTrips";
import ViewSavedTrips from "../pages/ViewSavedTrips";
import NotFound from "../pages/404";

const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedViewCard = ProtectRoute(ViewCard);
const ProtectedRecordTrips = ProtectRoute(RecordTrips);
const ProtectedViewSavedTrips = ProtectRoute(ViewSavedTrips);

const Routes: FC = () => {
  const { user } = useAuth()!;
  return (
    <BrowserRouter>
      <NavBar />
      <AllRoutes>
        <Route index element={user ? <ViewAccount /> : <LoginRegister />} />
        <Route path='/view-cards' element={<ProtectedViewCard />} />
        <Route path='/link-card' element={<ProtectedLinkCard />} />
        <Route path='/record-trip' element={<ProtectedRecordTrips />} />
        <Route path='/view-trips' element={<ProtectedViewSavedTrips />} />
        <Route path='*' element={<NotFound />} />
      </AllRoutes>
    </BrowserRouter>
  );
}

export { useAuth };
export default Routes;
