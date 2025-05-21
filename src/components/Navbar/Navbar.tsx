import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoorOpen } from 'lucide-react';
import logo from '../../assets/imx-logo.jpg';
import userAvatar from '../../assets/imx-03.jpg';

const Avatar = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <img
        src={src}
        alt={alt}
        className="w-10 h-10 rounded-full object-cover border border-gray-300"
      />
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="h-20 w-screen px-6 flex items-center justify-between bg-white shadow">
      <div>
        <img src={logo} alt="Company Logo" width={200} />
      </div>

      <div className="relative">
        <Avatar
          src={userAvatar}
          alt="Rayan's Avatar"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {isMenuOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-xl rounded-lg border z-50 w-44">
            <div
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={handleLogout}
            >
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="font-medium text-gray-700">Logout</span>
              <DoorOpen size={18} className="ml-auto text-red-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
