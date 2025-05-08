import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button"; 

const Attendance = () => {
  const [today, setToday] = useState("");

  const [attendanceData] = useState([
    {
      date: "Apr 30, 2025",
      checkIn: "8:45 AM",
      breakTime: "12:30 PM - 1:30 PM",
      checkOut: "5:45 PM",
      hours: "8h",
      status: "Complete",
    },
  ]);

  const handleSelection = (type: string) => {
    console.log(`${type} selected`);
    // Add your checkout logic here
  };

  useEffect(() => {
    const now = new Date();
    setToday(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="bg-white text-black mt-10 rounded-xl shadow-lg p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Today's Attendance</h2>
          <p className="text-sm text-gray-300">{today}</p>
        </div>
        <div className="flex gap-3">
          <button className="!bg-[#079669] text-white px-4 py-1 rounded-full text-sm">
            ➕ Check In
          </button>
          <button className="!bg-[#f39f0b] text-white px-4 py-1 rounded-full text-sm">
            ☕ Break
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="!bg-[#dd2428] text-white px-4 py-1 rounded-full text-sm">
                ➖ Check Out
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white text-black">
              <DropdownMenuItem onClick={() => handleSelection("Partial")}>
                Partially Checkout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelection("Full")}>
                Fully Checkout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Timeline Placeholder */}
      <div className="bg-[#f9f9f9] h-20 rounded-md flex items-center justify-start gap-6 px-6">
        <div className="flex flex-col items-center text-xs text-green-400">
          <div className="w-2 h-2 rounded-full bg-green-400 mb-1"></div>
          9:00 AM
        </div>
        <div className="flex flex-col items-center text-xs text-yellow-300">
          <div className="w-2 h-2 rounded-full bg-yellow-300 mb-1"></div>
          1:00 PM
        </div>
        <div className="flex flex-col items-center text-xs text-yellow-300">
          <div className="w-2 h-2 rounded-full bg-yellow-300 mb-1"></div>
          2:00 PM
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-[#f9f9f9] text-black">
            <tr>
              <th className="p-3">DATE</th>
              <th className="p-3">CHECK IN</th>
              <th className="p-3">BREAK TIME</th>
              <th className="p-3">CHECK OUT</th>
              <th className="p-3">TOTAL HOURS</th>
              <th className="p-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index} className="border-t border-[#eff4f8]">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.checkIn}</td>
                <td className="p-3">{item.breakTime}</td>
                <td className="p-3">{item.checkOut}</td>
                <td className="p-3">{item.hours}</td>
                <td className="p-3">
                  <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
