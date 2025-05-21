import React from 'react';

/**
 * Footer component for app branding and link.
 */
function Footer() {
  return (
    <footer className="text-center text-gray-600 mt-8 text-sm">
      Vending Machine Simulator using React and TailwindCSS |{' '}
      <a
        href="https://github.com/mike-at-redspace"
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-800"
      >
        mike-at-redspace
      </a>
    </footer>
  );
}

export default Footer;
