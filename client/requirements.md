## Packages
framer-motion | For smooth page transitions and entry animations
clsx | For conditional class names
tailwind-merge | For merging tailwind classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["'Outfit'", "sans-serif"],
  body: ["'DM Sans'", "sans-serif"],
}

API Integration:
- Inquiries POST to /api/inquiries
- Admin requires auth via /api/auth/user
- Images handled via Unsplash URLs
