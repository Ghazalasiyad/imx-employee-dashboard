import { useState } from "react";
import { Button } from "@/components/ui/button";

const Leaves = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    reason: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Leave Application Submitted:", formData);
    setFormData({ from: "", to: "", reason: "",type:"" });
    setShowPopup(false);
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
        <div className="bg-white text-black  rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black mb-1">Sick Leave</p>
          <p className="text-3xl font-semibold">15</p>
          <p className="text-sm text-black">of 24 days</p>
        </div>
        <div className="bg-white text-black  rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black  mb-1">Pending Requests</p>
          <p className="text-3xl font-semibold text-blue-400">2</p>
          <p className="text-sm text-black ">requests</p>
        </div>

        <div className="bg-white text-black  rounded-xl px-6 py-4 w-64 ">
          <p className="text-sm text-black  mb-1">Approved</p>
          <p className="text-3xl font-semibold text-green-400">8</p>
          <p className="text-sm text-black ">this year</p>
        </div>
      </div>

      <div className="flex justify-end">
  <Button
    className="!bg-[#26344e] hover:bg-blue-700 text-white"
    onClick={() => setShowPopup(true)}
  >
    + Apply for Leave
  </Button>
</div>



      {/* Inline Popup Form */}
      {showPopup && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md z-10">
          <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">From</label>
              <input
                type="date"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm">To</label>
              <input
                type="date"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
                required
              />
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
    name="type"
    value={formData.type}
    
    className="w-full mt-1 px-3 py-2 border rounded-md"
    required
  >
    <option value="" disabled>Select leave type</option>
    <option value="Annual Leave">Annual Leave</option>
    <option value="Sick Leave">Sick Leave</option>
  </select>
</div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                className="text-white !bg-[#2c3445]"
                onClick={() => setShowPopup(false)}
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
  <h2 className="text-lg font-semibold mb-4">Leave History</h2>
  <table className="w-full text-sm text-left text-white">
    <thead className="text-xs uppercase text-black border-b border-[#f4f7fa]">
      <tr>
        <th scope="col" className="py-3 px-4">Type</th>
        <th scope="col" className="py-3 px-4">Date</th>
        <th scope="col" className="py-3 px-4">Days</th>
        <th scope="col" className="py-3 px-4">Status</th>
        <th scope="col" className="py-3 px-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-[#f4f7fa] text-black">
        <td className="py-3 px-4">Annual Leave</td>
        <td className="py-3 px-4">Mar 3-4, 2025</td>
        <td className="py-3 px-4">2</td>
        <td className="py-3 px-4">
          <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">Approved</span>
        </td>
        <td className="py-3 px-4">
          <span className="text-blue-400 cursor-pointer hover:underline">View</span>
        </td>
      </tr>
      <tr className="border-b border-[#f4f7fa] text-black ">
        <td className="py-3 px-4">Sick Leave</td>
        <td className="py-3 px-4">Feb 15, 2025</td>
        <td className="py-3 px-4">1</td>
        <td className="py-3 px-4">
          <span className="bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full">Pending</span>
        </td>
        <td className="py-3 px-4">
          <span className="text-blue-400 cursor-pointer hover:underline">View</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Leaves;
