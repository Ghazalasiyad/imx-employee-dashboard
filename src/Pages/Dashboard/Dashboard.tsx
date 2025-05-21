import { useEffect, useState } from 'react';

const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
];

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [quote, setQuote] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    setCheckInTime(now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }));

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[nextIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 h-auto relative text-[#334557]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-4 md:items-center">
          <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-[#e2e8f0] w-full md:w-96 transition-all duration-500">
            <p className="text-sm italic text-gray-700">"{quote}"</p>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="bg-[#334557] text-white px-4 py-2 rounded-lg shadow-md w-full md:w-48 text-sm"
            >
              <option value="" disabled className="text-gray-300">
                Select Month
              </option>
              {months.map((month) => (
                <option key={month} value={month} className="bg-white text-[#334557]">
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white shadow-sm rounded-xl p-5 border border-[#e2e8f0] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#f0f4f8] p-2 rounded-lg">
              <svg className="w-5 h-5 text-[#334557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Current Date</h3>
          </div>
          <p className="text-xl font-semibold">{currentDate}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 border border-[#e2e8f0] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#f0f4f8] p-2 rounded-lg">
              <svg className="w-5 h-5 text-[#334557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Check-in Time</h3>
          </div>
          <p className="text-xl font-semibold">{checkInTime}</p>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-5 border border-[#e2e8f0] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#f0f4f8] p-2 rounded-lg">
              <svg className="w-5 h-5 text-[#334557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Quick Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-500">Presents</p>
              <p className="text-lg font-semibold">--</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Absent</p>
              <p className="text-lg font-semibold">--</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Hours</p>
              <p className="text-lg font-semibold">--</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="p-5 border-b border-[#e2e8f0]">
          <h3 className="text-lg font-semibold">
            Monthly Attendance Summary {selectedMonth && `- ${selectedMonth}`}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8fafc]">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Presents</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Absent</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productive Hours</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Hours/Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">--</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">--</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">--</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white shadow-sm rounded-lg p-4 border border-[#e2e8f0] flex items-center gap-3 hover:bg-[#f8fafc] transition-colors">
          <div className="bg-[#4ade80] bg-opacity-10 p-2 rounded-lg">
            <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-white"> Quick Check-in</span>
        </button>
        <button className="bg-white shadow-sm rounded-lg p-4 border border-[#e2e8f0] flex items-center gap-3 hover:bg-[#f8fafc] transition-colors">
          <div className="bg-[#f59e0b] bg-opacity-10 p-2 rounded-lg">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Start Break</span>
        </button>
        <button className="bg-white shadow-sm rounded-lg p-4 border border-[#e2e8f0] flex items-center gap-3 hover:bg-[#f8fafc] transition-colors">
          <div className="bg-[#ef4444] bg-opacity-10 p-2 rounded-lg">
            <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Check Out</span>
        </button>
        <button className="bg-white shadow-sm rounded-lg p-4 border border-[#e2e8f0] flex items-center gap-3 hover:bg-[#f8fafc] transition-colors">
          <div className="bg-[#3b82f6] bg-opacity-10 p-2 rounded-lg">
            <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Request Leave</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;