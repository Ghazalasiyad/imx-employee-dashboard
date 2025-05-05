import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 pt-[30px] h-full bg-[#202938] p-4  border-r border-white">
      <nav className="space-y-4 e" >
        <div>
          <Link to="/dashboard"  className="w-full text-md hover:bg-[#384152] hover:text-[#689ddd]  font-medium rounded-md  py-2 px-6 text-center !text-white">
            Dashboard
          </Link>
        </div>
        <div>
          <Link to="/attendance" className="w-full text-md font-medium rounded-md hover:bg-[#384152] hover:text-[#689ddd] py-2 px-6 text-center !text-white">
            Attendance
          </Link>
        </div>
        <div>
          <Link to="/leaves" className="w-full text-md font-medium rounded-md  py-2 px-6  hover:bg-[#384152] hover:text-[#689ddd] text-center !text-white">
            Leaves
          </Link>
        </div>
        <div>
          <Link to="/notice" className="w-full text-md font-medium rounded-md hover:bg-[#384152] hover:text-[#689ddd] py-2 px-6 text-center !text-white">
         Notices
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
