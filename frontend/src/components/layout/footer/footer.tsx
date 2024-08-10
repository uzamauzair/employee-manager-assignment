export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:py-2 lg:space-x-40 lg:pt-12 lg:pb-4 px-6">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <p className="text-[15px] md:text-[13px] text-gray-400">
            © {currentYear} Employee Manager. All Rights Reserved.
          </p>
          <p className="text-[18px] font-semibold">Employee Manager</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
