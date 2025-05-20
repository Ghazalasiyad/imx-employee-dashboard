import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 pt-[30px] h-full bg-white p-4 ">
      <nav className="space-y-4">
        <div className='text-left'>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 !text-left !text-black ${
                isActive ? 'bg-[#d4d6dc] text-[#689ddd]' : 'hover:bg-[#d4d6dc] hover:text-[#689ddd]'
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
              `w-full text-md font-medium rounded-md py-2 px-14 text-left !text-black  ${
                isActive ? 'bg-[#d4d6dc] text-[#689ddd]' : 'hover:bg-[#d4d6dc] hover:text-[#689ddd]'
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
              `w-full text-md font-medium rounded-md py-2 px-14 text-left !text-black  ${
                isActive ? 'bg-[#d4d6dc] text-[#689ddd]' : 'hover:bg-[#d4d6dc] hover:text-[#689ddd]'
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
              `w-full text-md font-medium rounded-md py-2 px-14 text-left !text-black  ${
                isActive ? 'bg-[#d4d6dc] text-[#689ddd]' : 'hover:bg-[#d4d6dc] hover:text-[#689ddd]'
              }`
            }
          >
            Notices
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/finance"
            className={({ isActive }) =>
              `w-full text-md font-medium rounded-md py-2 px-14 text-left !text-black  ${
                isActive ? 'bg-[#d4d6dc] text-[#689ddd]' : 'hover:bg-[#d4d6dc] hover:text-[#689ddd]'
              }`
            }
          >
           Finance
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
