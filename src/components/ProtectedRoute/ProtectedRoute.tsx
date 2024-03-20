import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { IdentityDetails } from '../../models';
import { Nullable } from '../../utils/Nullable';

interface ProtectedRouteProps {
  getIdentity: () => Nullable<IdentityDetails>;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  getIdentity,
}: ProtectedRouteProps) => getIdentity()
  ? <Outlet/>
  : <Navigate to={PageRoutes.Main} />;