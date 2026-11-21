type IconProps = { size?: number; className?: string };

function Stroke({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Fill({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}><path d="M7 17 17 7M8 7h9v9" /></Stroke>
);
export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Stroke>
);
export const ArrowLeft = (p: IconProps) => (
  <Stroke {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Stroke>
);
export const Download = (p: IconProps) => (
  <Stroke {...p}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></Stroke>
);
export const Mail = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Stroke>
);
export const MapPin = (p: IconProps) => (
  <Stroke {...p}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Stroke>
);
export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Stroke>
);
export const Moon = (p: IconProps) => (
  <Stroke {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></Stroke>
);
export const Menu = (p: IconProps) => (
  <Stroke {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Stroke>
);
export const Close = (p: IconProps) => (
  <Stroke {...p}><path d="M6 6l12 12M18 6 6 18" /></Stroke>
);
export const Check = (p: IconProps) => (
  <Stroke {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Stroke>
);
export const Calendar = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Stroke>
);
export const Clock = (p: IconProps) => (
  <Stroke {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Stroke>
);
export const Link2 = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" />
  </Stroke>
);

export const ExternalLink = ArrowUpRight;

export const GitHub = (p: IconProps) => (
  <Fill {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </Fill>
);
export const LinkedIn = (p: IconProps) => (
  <Fill {...p}>
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.400 4.300 5.500v6.200ZM5.300 7.400a2.100 2.100 0 1 1 0-4.200 2.100 2.100 0 0 1 0 4.200ZM7.100 20.500H3.600V9h3.500v11.500Z" />
  </Fill>
);
export const XIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M18.2 2.2h3.3l-7.200 8.300 8.500 11.300h-6.700l-5.200-6.800-6 6.800H1.600l7.700-8.800L1.200 2.200H8l4.700 6.200 5.500-6.200Zm-1.200 17.600h1.800L7.100 4.100H5.100L17 19.800Z" />
  </Fill>
);

export const HomeIcon = (p: IconProps) => (
  <Stroke {...p}><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" /></Stroke>
);
export const Briefcase = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></Stroke>
);
export const BookOpen = (p: IconProps) => (
  <Stroke {...p}><path d="M12 6c-1.800-1.300-4.200-2-7-2v14c2.800 0 5.200.7 7 2 1.800-1.300 4.200-2 7-2V4c-2.800 0-5.200.7-7 2ZM12 6v14" /></Stroke>
);
export const UserIcon = (p: IconProps) => (
  <Stroke {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.500 3.600-6 8-6s8 2.500 8 6" /></Stroke>
);
export const Ellipsis = (p: IconProps) => (
  <Stroke {...p}><circle cx="5" cy="12" r="1.200" /><circle cx="12" cy="12" r="1.200" /><circle cx="19" cy="12" r="1.200" /></Stroke>
);
export const ChevronRight = (p: IconProps) => (
  <Stroke {...p}><path d="m9 6 6 6-6 6" /></Stroke>
);

export const FileText = (p: IconProps) => (
  <Stroke {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></Stroke>
);
export const Monitor = (p: IconProps) => (
  <Stroke {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></Stroke>
);
export const ChevronLeft = (p: IconProps) => (
  <Stroke {...p}><path d="m15 6-6 6 6 6" /></Stroke>
);
export const Search = (p: IconProps) => (
  <Stroke {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.200-4.200" /></Stroke>
);
export const Sparkles = (p: IconProps) => (
  <Stroke {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></Stroke>
);
