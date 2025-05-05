import { Button } from "@/components/ui/button";

const Leaves = () => {
  return (
    <div className="w-full px-6 py-6 space-y-6 bg-[#1a1f2e] min-h-screen">
      <div className="flex flex-wrap gap-6">
        {/* Annual Leave */}
        <div className="bg-[#2c3445] rounded-xl px-6 py-4 w-64 text-white">
          <p className="text-sm text-gray-300 mb-1">Annual Leave</p>
          <p className="text-3xl font-semibold">15</p>
          <p className="text-sm text-gray-400">of 24 days</p>
        </div>

        {/* Sick Leave */}
        <div className="bg-[#2c3445] rounded-xl px-6 py-4 w-64 text-white">
          <p className="text-sm text-gray-300 mb-1">Sick Leave</p>
          <p className="text-3xl font-semibold">5</p>
          <p className="text-sm text-gray-400">of 12 days</p>
        </div>

        {/* Pending Requests */}
        <div className="bg-[#2c3445] rounded-xl px-6 py-4 w-64 text-white">
          <p className="text-sm text-gray-300 mb-1">Pending Requests</p>
          <p className="text-3xl font-semibold text-blue-400">2</p>
          <p className="text-sm text-gray-400">requests</p>
        </div>

        {/* Approved */}
        <div className="bg-[#2c3445] rounded-xl px-6 py-4 w-64 text-white">
          <p className="text-sm text-gray-300 mb-1">Approved</p>
          <p className="text-3xl font-semibold text-green-400">8</p>
          <p className="text-sm text-gray-400">this year</p>
        </div>
      </div>

      {/* Apply Button */}
      <Button className="!bg-blue-600 hover:bg-blue-700 text-white">
        + Apply for Leave
      </Button>
    </div>
  );
};

export default Leaves;
