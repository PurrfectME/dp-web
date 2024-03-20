import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import {
  AssetsPage, HistoryPage, MainPage,
  SettingsPage, TransactionsPage
} from '../../pages';
import { HeaderPanel } from '../HeaderPanel/HeaderPanel';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getIdentityDetails } from '../../services/identityProvider';
import './ApplicationLayout.scss';

export const ApplicationLayout = () => {
  return (
    <>
      <HeaderPanel/>
      <div className='page-wrapper'>
        <Routes>
          <Route path={PageRoutes.Main} element={<SettingsPage />} />
          <Route path={PageRoutes.Transactions} element={<TransactionsPage />} />
          <Route element={<ProtectedRoute getIdentity={getIdentityDetails}/>}>
            <Route path={PageRoutes.Assets} element={<AssetsPage />} />
            <Route path={PageRoutes.History} element={<HistoryPage />} />
            <Route path={PageRoutes.Settings} element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};