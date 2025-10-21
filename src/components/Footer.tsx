// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white text-center p-4 mt-6">
    © {new Date().getFullYear()} My Enterprise App — All rights reserved.
  </footer>
);

export default Footer;
