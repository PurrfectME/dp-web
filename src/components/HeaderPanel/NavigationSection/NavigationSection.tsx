import React from 'react';
import { useLocation } from 'react-router-dom';
import DPositLogo from '../../../assets/logo.svg';
import { PageRoutes } from '../../../constants';
import { NavigationItem } from './NavigationItem/NavigationItem';
import './NavigationSection.scss';

const navigationItems = [
  {
    title: 'HeaderPanel.NavigationSection.Transactions',
    path: '/transactions',
    protected: false
  },
  {
    title: 'HeaderPanel.NavigationSection.History',
    path: '/history',
    protected: true
  },
  {
    title: 'HeaderPanel.NavigationSection.Assets',
    path: '/assets',
    protected: true
  },
  {
    title: 'HeaderPanel.NavigationSection.Settings',
    path: '/settings',
    protected: true
  },
];

interface NavigationSectionProps {
  onNavigate: (path: string) => void;
  isLoggedIn: boolean;
}

export const NavigationSection = ({
  onNavigate,
  isLoggedIn
}: NavigationSectionProps) => {
  const location = useLocation();

  return (
    <div className="navigation-section">
      <img
        src={DPositLogo}
        alt="DPosit Logo"
        className="logo-icon"
        onClick={() => onNavigate(PageRoutes.Main)}
      />
      {navigationItems.filter(x => isLoggedIn || !x.protected).map(item => (
        <NavigationItem
          path={item.path}
          title={item.title}
          isActive={location.pathname === item.path}
          onClick={() => onNavigate(item.path)}
          key={item.path}
        />
      ))}
    </div>
  );
}
