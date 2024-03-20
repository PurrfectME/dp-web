import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApplicationLayout } from './components';
import { PageRoutes } from './constants';
import { ConfirmEmailChangePage, ConfirmRegistrationPage, ResetPasswordPage } from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ApplicationLayout />} />
          <Route path={PageRoutes.ConfirmRegistration} element={<ConfirmRegistrationPage />} />
          <Route path={PageRoutes.ConfirmEmailChange} element={<ConfirmEmailChangePage />} />
          <Route path={PageRoutes.ResetPassword} element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
