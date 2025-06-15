import React from 'react';
import { IconProps } from './IconProps';

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z" />
    <path d="M12 6C9.24 6 7 8.24 7 11V16C7 16.55 7.45 17 8 17H11V11C11 8.24 13.24 6 16 6C15.21 6 14.46 6.19 13.79 6.5L12 6Z" />
    <path d="M17 7C16.45 7 16 7.45 16 8V13H11V17H16C16.55 17 17 16.55 17 16V11C17 9.35 15.65 8 14 8C14 7.45 14.45 7 15 7H17Z" />
  </svg>
  // Simplified book icon
  // FontAwesome book-open: <path d="M11 0C8.23858 0 6 2.23858 6 5V17C6 18.1046 6.89543 19 8 19H10V21H12V19H14V21H16V19H18C19.1046 19 20 18.1046 20 17V5C20 2.23858 17.7614 0 15 0H11ZM8 5H11V17H8V5ZM15 2C16.6569 2 18 3.34315 18 5V17H15V2Z"/>
);