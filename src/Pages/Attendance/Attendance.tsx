import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StartBreak, endBreak } from "@/components/Api/PostServices";
import {
  checkIn,
  checkOut,
  getAttendanceSummary,
} from "@/components/Api/PostServices";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Attendance = () => {
  const [today, setToday] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [partiallyCheckedOut, setPartiallyCheckedOut] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<Array<{
    type: string;
    time: Date;
    description: string;
  }>>([]);

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

  useEffect(() => {
    const employee = localStorage.getItem("employeeId");
    if (employee) {
      setEmployeeId(employee);
    }
    const checkedIn = localStorage.getItem("hasCheckedIn");
    if (checkedIn === "true") {
      setHasCheckedIn(true);
    }
  }, []);

  const addTimelineEvent = (type: string, description: string) => {
    const now = new Date();
    setTimelineEvents(prev => [
      ...prev,
      { type, time: now, description }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const {
    mutate: handleCheckIn,
    isPending: isCheckingIn,
  } = useMutation({
    mutationFn: () => checkIn(),
    onSuccess: () => {
      setHasCheckedIn(true);
      localStorage.setItem("hasCheckedIn", "true");
      addTimelineEvent('checkin', 'Checked in');
      toast.success("Checked in successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    },
  });


  const handleBreakToggle = async () => {
    setLoading(true);
    try {
      if (onBreak) {
        await endBreak();
        setOnBreak(false);
      } else {
        await StartBreak();
        setOnBreak(true);
      }
    } catch (error) {
      console.error("Break API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    mutate: handleCheckOut,
    isPending: isCheckingOut,
  } = useMutation({
    mutationFn: () => checkOut(),
    onSuccess: () => {
      addTimelineEvent('checkout', 'Fully checked out');
      toast.success("You have fully checked out!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong during full checkout!";
      toast.error(message);
    },
  });


  const handleBreak = () => {
    if (!onBreak) {
      setOnBreak(true);
      addTimelineEvent('break-start', 'Break started');
    } else {
      setOnBreak(false);
      addTimelineEvent('break-end', 'Break ended');
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceSummary", employeeId],
    queryFn: getAttendanceSummary,
    enabled: !!employeeId,
  });
  console.log('new data', data)
  const attendanceData = useMemo(() => {
    if (data?.length > 0) {
      const record = data[0];
      return [{
        date: record.date ? format(new Date(record.date), "dd MMM yyyy") : "N/A",
        checkIn: record.checkInTime ? format(new Date(record.checkInTime), "hh:mm a") : "N/A",
        breakTime: record.breakTime
          ? `${format(new Date(record.breakTime.start), "hh:mm a")} - ${format(new Date(record.breakTime.end), "hh:mm a")}`
          : "N/A",
        checkOut: record.checkOutTime ? format(new Date(record.checkOutTime), "hh:mm a") : "N/A",
        hours: record.totalHoursWorked ? `${record.totalHoursWorked}h` : "N/A",
        status: "Complete",
      }];
    }
    return [];
  }, [data]);


  console.log("data", attendanceData)
  const getStatusBadgeClass = () => {
    if (isCheckingOut) return "status-checkedout";
    if (partiallyCheckedOut) return "status-partial";
    if (onBreak) return "status-break";
    if (hasCheckedIn) return "status-working";
    return "";
  };

  const getStatusText = () => {
    if (isCheckingOut) return "Checked Out";
    if (partiallyCheckedOut) return "Partially Checked Out";
    if (onBreak) return "On Break";
    if (hasCheckedIn) return "Working";
    return "-";
  };

  return (
    <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#f9f9f9] text-[#334557] p-3 flex justify-between items-center">
        <h2 className="text-4xl font-semibold">Attendance Dashboard</h2>
        <div className="text-sm opacity-90">{today}</div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#334557]">Today's Attendance</h2>
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleCheckIn();

              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isCheckingIn || hasCheckedIn
                ? "bg-gray-200 text-gray-300 cursor-not-allowed"
                : "bg-[#4ade80] text-[#166534] hover:bg-[#3acf74]"
                } `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Check In
            </button>
            <button
              onClick={handleBreakToggle}
              disabled={!hasCheckedIn || loading}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${!hasCheckedIn
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : onBreak
                  ? "bg-[#f59e0b] text-[#f1ab27] hover:bg-[#d97706] shadow-md"
                  : "bg-[#fbbf24] text-[#f1ab27] hover:bg-[#f59e0b] shadow-md"
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {onBreak ? "End Break" : "Start Break"}
                </>
              )}
            </button>
          </div>
        </div>

        {timelineEvents.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Today's Activity Timeline</h3>
            <div className="relative pl-6">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative pb-4 pl-6 last:pb-0">
                  <div className={`absolute left-0 top-1 w-3 h-3 rounded-full ${event.type === 'checkin' ? 'bg-[#4ade80] ring-2 ring-[#4ade8040]' :
                    event.type === 'break-start' ? 'bg-[#fbbf24] ring-2 ring-[#fbbf2440]' :
                      event.type === 'break-end' ? 'bg-[#fbbf24] ring-2 ring-[#fbbf2440] border-2 border-white' :
                        event.type === 'checkout' ? 'bg-[#f87171] ring-2 ring-[#f8717140]' :
                          'bg-[#60a5fa] ring-2 ring-[#60a5fa40]'
                    }`}></div>
                  <div className="text-xs text-gray-500">{formatTime(event.time)}</div>
                  <div className="text-sm font-medium text-gray-800">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-gray-600 font-medium">Date</th>
                <th className="p-3 text-left text-gray-600 font-medium">Check In</th>
                <th className="p-3 text-left text-gray-600 font-medium">Break Time</th>
                <th className="p-3 text-left text-gray-600 font-medium">Check Out</th>
                <th className="p-3 text-left text-gray-600 font-medium">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    Loading attendance data...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-red-400">
                    Error fetching attendance summary
                  </td>
                </tr>
              ) : attendanceData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No attendance data available
                  </td>
                </tr>
              ) : (
                attendanceData.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.checkIn}</td>
                    <td className="p-3">{item.breakTime}</td>
                    <td className="p-3">{item.checkOut}</td>
                    <td className="p-3 font-medium">{item.hours}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;