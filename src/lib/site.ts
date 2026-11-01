export const SITE = {
  name: "Sri Sathya Sai Seva Samithi",
  fullName: "Sri Sathya Sai Seva Organisations",
  location: "Premsadan, MVP Colony, Visakhapatnam",
  convenor: "Sri B Sai Kumar",
  role: "Convenor, City Samithi",
  address:
    "Adarsh Nagar Road, Near TTD Kalyana Mandapam, Sector 8, MVP Colony, Visakhapatnam, Andhra Pradesh – 530017",
  email: "premsadan.mvp@saiorganisation.org",
  phone: "+91 00000 00000",
  subdomain: "mvp_premsadan",
};

export const QUOTES = [
  { text: "Love All, Serve All", by: "Bhagawan Sri Sathya Sai Baba" },
  { text: "Help Ever, Hurt Never", by: "Bhagawan Sri Sathya Sai Baba" },
  { text: "Service to Man is Service to God", by: "Bhagawan Sri Sathya Sai Baba" },
  { text: "Start the day with love. Fill the day with love. End the day with love.", by: "Bhagawan Sri Sathya Sai Baba" },
  { text: "Hands that serve are holier than lips that pray.", by: "Bhagawan Sri Sathya Sai Baba" },
  { text: "Where there is Faith, there is Love; Where there is Love, there is Peace.", by: "Bhagawan Sri Sathya Sai Baba" },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
] as const;

export const SEVA_NAV = [
  { to: "/education", label: "Education", desc: "Bal Vikas & scholarships" },
  { to: "/healthcare", label: "Healthcare", desc: "Camps & health awareness" },
  { to: "/welfare", label: "Welfare", desc: "Narayana & Grama Seva" },
  { to: "/events", label: "Events", desc: "Bhajans & festivals" },
] as const;

export const NAV_TAIL = [
  { to: "/gallery", label: "Gallery" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
] as const;
