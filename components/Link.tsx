import React from 'react';

import NextLink from 'next/link';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'inline' | 'btn';
  href: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  variant = 'inline',
  children,
  ...elProps
}) => (
  <NextLink href={href} scroll={false}>
    <a
      className={variant === 'inline' ? 'link' : 'btn btn--primary'}
      {...elProps}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
