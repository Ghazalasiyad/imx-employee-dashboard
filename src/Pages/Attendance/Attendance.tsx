import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkIn,
  checkOut,
  getAttendanceSummary,
  partialCheckout,
} from "@/components/Api/PostServices";
import { toast } from "react-toastify";
import { format } from "date-fns";
const Attendance = () => {
  const [today, setToday] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
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
  const {
    mutate: handleCheckIn,
    isPending,
  } = useMutation({
    mutationFn: () => checkIn(),
    onSuccess: () => {
      setHasCheckedIn(true);
      localStorage.setItem("hasCheckedIn", "true");
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
  const {
    mutate: handlePartialCheckout,
    isPending: isPartialCheckingOut,
  } = useMutation({
    mutationFn: () => partialCheckout(),
    onSuccess: () => {
      toast.success("Partial checkout successful!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong during partial checkout!";
      toast.error(message);
    },
  });
  const {
    mutate: handleCheckOut,
    isPending: isCheckingOut,
  } = useMutation({
    mutationFn: () => checkOut(),
    onSuccess: () => {
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceSummary", employeeId],
    queryFn: getAttendanceSummary,
    enabled: !!employeeId,
  });
  const attendanceData =
    data?.data?.records?.length > 0
      ? [
          {
            date: data.data.records[0].date
              ? format(new Date(data.data.records[0].date), "dd MMM yyyy")
              : "N/A",
            checkIn: data.data.records[0].checkInTime
              ? format(new Date(data.data.records[0].checkInTime), "hh:mm a")
              : "N/A",
            breakTime: data.data.records[0].breakTime
              ? `${format(new Date(data.data.records[0].breakTime.start), "hh:mm a")} - ${format(
                  new Date(data.data.records[0].breakTime.end),
                  "hh:mm a"
                )}`
              : "N/A",
            checkOut: data.data.records[0].checkOutTime
              ? format(new Date(data.data.records[0].checkOutTime), "hh:mm a")
              : "N/A",
            hours: data.data.records[0].totalHoursWorked
              ? `${data.data.records[0].totalHoursWorked}h`
              : "N/A",
            status: "Complete",
          },
        ]
      : [];
  return (
    
      <div className="bg-white text-black rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Today's Attendance</h2>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleCheckIn()}
              disabled={isPending || hasCheckedIn}
              className="!bg-[#079669] text-white px-4 py-1 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
               Check In
            </button>
            <button className="!bg-[#F39F0B] text-white px-4 py-1 rounded-full text-sm">
               Break
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="!bg-[#DD2428] text-white px-4 py-1 rounded-full text-sm">
                  Check Out
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white text-black">
                <DropdownMenuItem onClick={() => handlePartialCheckout()}>
                  Partially Checkout
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCheckOut()}>
                  Fully Checkout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Timeline Placeholder */}
        <div className="bg-[#F9F9F9] h-20 rounded-md flex items-center justify-start gap-6 px-6">
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
        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#F9F9F9] text-black">
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-red-400">
                    Error fetching attendance summary
                  </td>
                </tr>
              ) : attendanceData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-400">
                    No attendance data found
                  </td>
                </tr>
              ) : (
                attendanceData.map((item, index) => (
                  <tr key={index} className="border-t border-[#EFF4F8]">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};
export default Attendance;






