import React from 'react';
import { IconProps } from './IconProps';

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z"/>
  </svg>
);
// FontAwesome user: <path d="M12 0C8.68629 0 6 2.68629 6 6C6 9.31371 8.68629 12 12 12C15.3137 12 18 9.31371 18 6C18 2.68629 15.3137 0 12 0ZM4 16C1.79086 16 0 17.7909 0 20V22C0 22.5523.447715 23 1 23H23C23.5523 23 24 22.5523 24 22V20C24 17.7909 22.2091 16 20 16H4Z"/>
