import React from 'react';
import { IconProps } from './IconProps';

export const HouseIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>
  </svg>
);
// FontAwesome house: <path d="M21.707 10.293L12.707 1.293C12.3166 .9026 11.6834 .9026 11.293 1.293L2.293 10.293C1.9026 10.6834 1.9026 11.3166 2.293 11.707C2.6834 12.0974 3.3166 12.0974 3.707 11.707L12 3.414L20.293 11.707C20.6834 12.0974 21.3166 12.0974 21.707 11.707C22.0974 11.3166 22.0974 10.6834 21.707 10.293ZM11 13V20H13V13H11ZM7 13V20H9V13H7ZM15 13V20H17V13H15Z"/>
// The path above is a simpler house icon.
