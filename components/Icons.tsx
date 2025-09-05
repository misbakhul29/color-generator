import React from 'react';

type IconProps = {
  className?: string;
};

export const Copy: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);

export const Check: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const WandSparkles: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m22 11-1-1-1.5 1.5.5 2.5-2.5-.5L16 13l-1-1-5 5-1.5-1.5.5-2.5-2.5-.5L6 13 5 12l-5 5 .5 2.5 2.5-.5L4.5 18 5 19l5-5 1.5 1.5-.5 2.5 2.5.5L15.5 18 16 17l5 5-2.5-.5-.5-2.5 1.5-1.5Z"></path>
        <path d="M9.5 2.5 8 4l1.5 1.5L8 7l1.5 1.5"></path>
        <path d="M14.5 2.5 13 4l1.5 1.5L13 7l1.5 1.5"></path>
        <path d="M19.5 2.5 18 4l1.5 1.5L18 7l1.5 1.5"></path>
    </svg>
);

export const BrainCircuit: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5a3 3 0 1 0-5.993.13a3 3 0 0 0-1.83 5.545a3 3 0 0 0 0 5.65A3 3 0 0 0 6 22a3 3 0 0 0 5.99-1.87A3 3 0 0 0 12 19a3 3 0 0 0 0-5.65a3 3 0 0 0 0-5.65A3 3 0 0 0 12 5Z"></path>
        <path d="M12 5a3 3 0 1 1 5.993.13a3 3 0 0 1 1.83 5.545a3 3 0 0 1 0 5.65A3 3 0 0 1 18 22a3 3 0 0 1-5.99-1.87A3 3 0 0 1 12 19a3 3 0 0 1 0-5.65a3 3 0 0 1 0-5.65A3 3 0 0 1 12 5Z"></path>
        <path d="M6 16.5a1 1 0 0 1 1 1"></path>
        <path d="M12 15a1 1 0 0 1 1 1"></path>
        <path d="M17 16.5a1 1 0 0 1 1 1"></path>
        <path d="M6 7.5a1 1 0 0 1 1 1"></path>
        <path d="M12 9a1 1 0 0 1 1 1"></path>
        <path d="M17 7.5a1 1 0 0 1 1 1"></path>
        <path d="M9 12a1 1 0 0 1 1-1"></path>
        <path d="M14 12a1 1 0 0 1 1-1"></path>
    </svg>
);

export const Shuffle: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.4-1.6l6-6.3c.9-1 2.1-1.6 3.4-1.6H22"></path>
        <path d="m18 2 4 4-4 4"></path>
        <path d="M2 6h1.4c1.3 0 2.5.6 3.4 1.6l2.3 2.7"></path>
        <path d="m18 22-4-4 4-4"></path>
        <path d="M22 18h-1.4c-1.3 0-2.5-.6-3.4-1.6l-2.3-2.7"></path>
    </svg>
);

export const Info: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
    </svg>
);

export const Sun: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
);

export const Moon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
);

export const HeartHandshake: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l.06.06c.82.82 2.13.82 2.94 0l0 0a2.17 2.17 0 0 0 0-3.08L12 5Z"/>
  </svg>
);

export const Building: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

export const Bookmark: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

export const Download: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const X: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const Tailwind: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16.5 10.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5z"/>
      <path d="M7.5 2c-3 0-5.5 2.5-5.5 5.5S4.5 13 7.5 13s5.5-2.5 5.5-5.5S10.5 2 7.5 2z"/>
    </svg>
);