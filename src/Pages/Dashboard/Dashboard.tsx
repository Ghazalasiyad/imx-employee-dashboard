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
    setCurrentDate(now.toLocaleDateString());
    setCheckInTime(now.toLocaleTimeString());

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="p-6 space-y-6 bg-[#1a2233] h-auto relative text-white">
      {/* Top Row: Quote box & Month selector */}
      <div className="flex justify-between items-center">
        {/* Smaller Quote Box */}
        <div className="bg-[#2c3445] rounded-lg px-4 py-2 shadow-md text-center max-w-md w-full">
          <p className="text-sm italic">"{quote}"</p>
        </div>

        {/* Dropdown aligned right */}
        <div>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="bg-[#2c3445] text-white px-4 py-2 rounded-lg shadow-md"
          >
            <option value="" disabled>
              Choose Month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Check-in Boxes */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-[#2c3445] shadow-md rounded-lg p-6 h-48 max-w-xl w-full flex flex-col justify-center">
          <h3 className="text-lg font-medium">Current Date</h3>
          <p className="mt-2 text-2xl font-bold">{currentDate}</p>
        </div>
        <div className="bg-[#2c3445] shadow-md rounded-lg p-6 h-48 max-w-xl w-full flex flex-col justify-center">
          <h3 className="text-lg font-medium">Check-in Time</h3>
          <p className="mt-2 text-2xl font-bold">{checkInTime}</p>
        </div>
      </div>

      {/* Monthly Stats Table */}
      <div className="bg-[#2c3445] shadow-md rounded-lg p-6 w-full max-w-screen mx-auto">
        <h3 className="text-xl font-semibold mb-4">
          Monthly Attendance Summary - {selectedMonth || "Not selected"}
        </h3>
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-600 pb-2">Total Presents</th>
              <th className="border-b border-gray-600 pb-2">Total Absent</th>
              <th className="border-b border-gray-600 pb-2">Productive Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">--</td>
              <td className="py-2">--</td>
              <td className="py-2">--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
