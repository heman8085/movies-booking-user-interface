import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Prime Movies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
