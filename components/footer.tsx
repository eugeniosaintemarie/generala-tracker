import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-auto border-t">
      <div className="container flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          ∃ © {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;