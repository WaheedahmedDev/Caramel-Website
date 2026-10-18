import React from 'react';

export interface BadgeProps {
  variant?: 'demo' | 'discount' | 'neutral';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'demo',
  children,
  className = '',
  icon,
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
