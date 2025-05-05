import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 pt-[30px] h-full bg-[#202938] p-4 border-r border-white">
      <nav className="space-y-4">
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 text-center !text-white ${
                isActive ? 'bg-[#384152] text-[#689ddd]' : 'hover:bg-[#384152] hover:text-[#689ddd]'
              }`
            }
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 text-center !text-white ${
                isActive ? 'bg-[#384152] text-[#689ddd]' : 'hover:bg-[#384152] hover:text-[#689ddd]'
              }`
            }
          >
            Attendance
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/leaves"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 text-center !text-white ${
                isActive ? 'bg-[#384152] text-[#689ddd]' : 'hover:bg-[#384152] hover:text-[#689ddd]'
              }`
            }
          >
            Leaves
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/notice"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 text-center !text-white ${
                isActive ? 'bg-[#384152] text-[#689ddd]' : 'hover:bg-[#384152] hover:text-[#689ddd]'
              }`
            }
          >
            Notices
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
