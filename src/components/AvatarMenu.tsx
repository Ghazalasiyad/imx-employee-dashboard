import React from 'react';
import { DoorOpen } from 'lucide-react';
import userAvatar from '../assets/imx-03.jpg';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

const AvatarMenu: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    onClose();
  };

  return (
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
  );
};

export default AvatarMenu;