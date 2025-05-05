import { useEffect, useState } from 'react';

const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
];

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCheckInTime(now.toLocaleTimeString());

    // Set initial quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    // Change quote every 5 seconds
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[nextIndex]);
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="p-6 space-y-6 bg-[#1a2233] h-auto">
      {/* Quote Box */}
      <div className="bg-[#2c3445] text-white rounded-lg px-6 py-4 shadow-md text-center">
        <p className="text-lg italic">"{quote}"</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Current Date Card */}
        <div className="bg-[#2c3445] shadow-md rounded-lg p-6 h-48 max-w-xl w-full flex flex-col justify-center">
          <h3 className="text-lg font-medium text-white">Current Date</h3>
          <p className="mt-2 text-2xl font-bold text-white">{currentDate}</p>
        </div>

        {/* Check-in Time Card */}
        <div className="bg-[#2c3445] shadow-md rounded-lg p-6 h-48 max-w-xl w-full flex flex-col justify-center">
          <h3 className="text-lg font-medium text-white">Check-in Time</h3>
          <p className="mt-2 text-2xl font-bold text-white">{checkInTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
