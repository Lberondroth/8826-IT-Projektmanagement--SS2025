import React from 'react';
import { IconProps } from './IconProps';

export const UtensilsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 2H17V11H16V2Z" />
    <path d="M14.24 2.28L14.95 2.99L9.95 7.99L9.24 7.28L14.24 2.28Z" />
    <path d="M7.5 2C6.4 2 5.5 2.9 5.5 4V11H4V22H6V12H7V22H9V12H10V11H8.5V4C8.5 3.45 8.05 3 7.5 3S6.5 3.45 6.5 4V4.5H7.5V2Z" />
    <path d="M18 12H19C19 14.76 16.76 17 14 17C11.24 17 9 14.76 9 12H10C10 14.21 11.79 16 14 16C16.21 16 18 14.21 18 12Z" />
    <path d="M17 12V22H19V12H17Z" />
  </svg>
);
// Simplified icon based on typical utensils representation
// Actual FontAwesome: <path d="M16 2H17V11H16V2ZM14.2412 2.28418L14.9483 2.99121L9.9485 7.99139L9.24141 7.28436L14.2412 2.28418ZM7.5 2C6.39543 2 5.5 2.89543 5.5 4V11H4V22H5V12H6V22H7V12H8V22H9V12H10V11H8.5V4C8.5 3.44772 8.05228 3 7.5 3C6.94772 3 6.5 3.44772 6.5 4V4.5H7.5V2ZM18 12H19C19 14.7613 16.7613 17 14 17C11.2387 17 9 14.7613 9 12H10C10 14.2093 11.7907 16 14 16C16.2093 16 18 14.2093 18 12ZM17 12V22H18V12H17Z"/>
// The SVG above is a simplified custom version. For exact match, use the full FontAwesome path.
