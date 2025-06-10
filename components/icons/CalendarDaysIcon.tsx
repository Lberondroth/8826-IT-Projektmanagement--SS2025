import React from 'react';
import { IconProps } from './IconProps';

export const CalendarDaysIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V9H19V19ZM19 7H5V5H19V7Z" />
    <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontSize="8px" fontWeight="bold" fill="currentColor" className={props.className && props.className.includes('text-slate-600') || props.className && props.className.includes('text-slate-500') ? "text-slate-600" : "text-white"}>
       {/* The image shows '28'. This is a simplified representation. Customizing SVG text like this is complex for dynamic coloring via className.
           A better approach for a fixed number would be to embed it directly in the path or use two SVGs.
           For simplicity, omitting the number here, or making it always one color.
           If the icon color is dark, text should be light, and vice-versa. This is tricky.
           The example "28" in the image seems to be part of the icon's background.
           Here, I'll add '28' which might not always look good with className color changes.
        */}
    </text>
     {/* Simplified Calendar icon. The '28' is tricky; often part of the icon's design.
        A common way to handle the "28" in the image is that the calendar icon itself has a "cutout" or contrasting color area for the number.
        SVG path for generic calendar:
     */}
     <path d="M7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM5 15H7V17H5V15ZM9 15H11V17H9V15ZM13 15H15V17H13V15Z"/>
  </svg>
);
// Note: The '28' as shown in the original image is part of the icon's visual design, typically white numbers on a colored calendar glyph.
// Replicating that exactly with a simple SVG and dynamic coloring is complex. This is a generic calendar.
// FontAwesome calendar-days: <path d="M8 2V5H5V2H3V5H2C.8954 5 0 5.8954 0 7V19C0 20.1046.8954 21 2 21H20C21.1046 21 22 20.1046 22 19V7C22 5.8954 21.1046 5 20 5H19V2H17V5H10V2H8ZM2 9H20V19H2V9ZM11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15H12.5C13.3284 15 14 14.3284 14 13.5C14 12.6716 13.3284 12 12.5 12H11.5Z"/>
// The image's calendar icon looks like a typical desk calendar with a number.
// A simple rectangle with lines and text '28' could also work.
// For the grid item:
// <svg ...> <rect x="3" y="4" width="18" height="16" rx="2" ry="2" /> <line x1="3" y1="9" x2="21" y2="9" /> <text x="12" y="16" text-anchor="middle" font-size="7" fill="white">28</text> </svg> (This text would be white, BG needs to be the icon color)
// This current SVG is a generic calendar icon.
