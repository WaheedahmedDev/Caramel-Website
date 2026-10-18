import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  as = 'button',
  href,
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeStyle =
    size === 'sm'
      ? { padding: 'var(--space-2xs) var(--space-md)', fontSize: 'var(--text-xs)' }
      : size === 'lg'
      ? { padding: 'var(--space-md) var(--space-2xl)', fontSize: 'var(--text-base)' }
      : {};

  if (as === 'a' || href) {
    return (
      <a
        href={href}
        className={`btn ${variantClass} ${className}`}
        style={sizeStyle}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children && <span>{children}</span>}
      </a>
    );
  }

  return (
    <button className={`btn ${variantClass} ${className}`} style={sizeStyle} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
