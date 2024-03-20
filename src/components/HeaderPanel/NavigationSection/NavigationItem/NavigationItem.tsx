import React from 'react';
import './NavigationItem.scss';
import { useTranslation } from 'react-i18next';

interface NavigationItemProps {
  title: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem = ({
  title,
  path,
  isActive,
  onClick
}: NavigationItemProps) => {
  const { t } = useTranslation();

  return (
    // TODO: check if can be simplified
    <div className="navigation-item">
      <h3 onClick={onClick} className={isActive ? 'active' : ''}>
        {t(title)}
      </h3>
    </div>
  );
}
