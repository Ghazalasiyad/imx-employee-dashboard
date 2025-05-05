import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'react-feather'; // Assuming you're using React Feather icons

// Custom Avatar component using TailwindCSS
const Avatar = ({ src, alt, onClick }: { src: string, alt: string, onClick: () => void }) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <img
        src={src}
        alt={alt}
        className="w-10 h-10 rounded-full object-cover"
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
    <header className="h-25 w-screen px-6 flex items-center justify-between bg-[#202938] border-b border-white">
      <h4 className="text-xl font-semibold text-white">Employee Dashboard</h4>

      <div className="relative">
        {/* Avatar Component */}
        <Avatar 
          src="/path/to/user-avatar.jpg"  
          alt="User Avatar"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border">
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span className="ml-2 font-semibold text-gray-700">Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
