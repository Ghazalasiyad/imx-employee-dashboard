import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddLeave, getLeaves } from "@/components/Api/PostServices";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Leaves = () => {
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const closePopup = () => {
    setSelectedLeave(null);
  };

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "",
  });

  const queryClient = useQueryClient();

  const { data: leaves, isLoading, isError } = useQuery({
    queryKey: ["leaves"],
    queryFn: getLeaves,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate } = useMutation({
    mutationFn: AddLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      toast.success("Leave request added successfully", {
        duration: 2000,
        position: "top-right",
      });
      setFormData({ startDate: "", endDate: "", reason: "", leaveType: "" });
      setShowApplyForm(false);
    },
    onError: (error: any) => {
      toast.error(
        `Failed to add Leave Request: ${
          error.response?.data.message || error.message
        }`,
        {
          duration: 2000,
          position: "top-right",
        }
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("reason", formData.reason);
    data.append("leaveType", formData.leaveType);

    mutate(data);
  };

  return (
    <div className="w-full px-6 py-6 space-y-6 min-h-screen text-white relative">
      <div className="flex flex-wrap gap-6">
        {/* Cards */}
        <div className="bg-white text-black rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black mb-1">Annual Leave</p>
          <p className="text-3xl font-semibold">15</p>
          <p className="text-sm text-black">of 24 days</p>
        </div>
        <div className="bg-white text-black rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black mb-1">Sick Leave</p>
          <p className="text-3xl font-semibold">15</p>
          <p className="text-sm text-black">of 24 days</p>
        </div>
        <div className="bg-white text-black rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black mb-1">Pending Requests</p>
          <p className="text-3xl font-semibold text-blue-400">2</p>
          <p className="text-sm text-black">requests</p>
        </div>
        <div className="bg-white text-black rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black mb-1">Approved</p>
          <p className="text-3xl font-semibold text-green-400">8</p>
          <p className="text-sm text-black">this year</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className="!bg-[#26344e] hover:bg-blue-700 text-white"
          onClick={() => setShowApplyForm(true)}
        >
          + Apply for Leave
        </Button>
      </div>

      {/* Apply Leave Popup Form */}
      {showApplyForm && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md z-10">
          <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">From</label>
                <DatePicker
                  selected={
                    formData.startDate ? new Date(formData.startDate) : null
                  }
                  onChange={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: date?.toISOString().split("T")[0] || "",
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">To</label>
                <DatePicker
                  selected={
                    formData.endDate ? new Date(formData.endDate) : null
                  }
                  onChange={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: date?.toISOString().split("T")[0] || "",
                    }))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm">Type</label>
              <select
                name="leaveType"
                onChange={handleChange}
                value={formData.leaveType}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              >
                <option value="" disabled>
                  Select leave type
                </option>
                <option value="annual leave">Annual Leave</option>
                <option value="sick leave">Sick Leave</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                className="text-white !bg-[#2c3445]"
                onClick={() => setShowApplyForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="!bg-[#2c3445] text-white">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Leave History Section */}
      <div className="bg-white rounded-xl p-6 mt-8 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-black">Leave History</h2>
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs uppercase text-black border-b border-[#f4f7fa]">
            <tr>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Days</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-black">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">
                  Failed to load leave history.
                </td>
              </tr>
            ) : leaves && leaves.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              leaves.map((leave: any, index: number) => (
                <tr key={index} className="border-b border-[#f4f7fa] text-black">
                  <td className="py-3 px-4 capitalize">{leave.leaveType}</td>
                  <td className="py-3 px-4">
                    {leave.startDate} - {leave.endDate}
                  </td>
                  <td className="py-3 px-4">
                    {calculateDays(leave.startDate, leave.endDate)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-white text-xs font-medium px-3 py-1 rounded-full ${
                        leave.status === "approved"
                          ? "bg-green-600"
                          : leave.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-blue-400 cursor-pointer hover:underline"
                      onClick={() => setSelectedLeave(leave)}
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-black">
                  No leave history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Leave Details Popup */}
      {selectedLeave && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Leave Details</h3>
            <p><strong>Type:</strong> {selectedLeave.leaveType}</p>
            <p><strong>From:</strong> {selectedLeave.startDate}</p>
            <p><strong>To:</strong> {selectedLeave.endDate}</p>
            <p><strong>Days:</strong> {calculateDays(selectedLeave.startDate, selectedLeave.endDate)}</p>
            <p><strong>Reason:</strong> {selectedLeave.reason}</p>
            <p><strong>Status:</strong> {selectedLeave.status}</p>
            <div className="flex justify-end mt-4">
              <Button onClick={closePopup} className="!bg-[#2c3445] text-white">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
