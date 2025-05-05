import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notice {
  id: number;
  title: string;
  date: string;
  description: string;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Holiday Notice",
    date: "2025-05-04",
    description: "The office will be closed on Monday due to a public holiday.",
  },
  {
    id: 2,
    title: "Team Meeting",
    date: "2025-05-03",
    description: "There will be a team meeting at 10:00 AM in the main hall.",
  },
  {
    id: 3,
    title: "Updated Leave Policy",
    date: "2025-05-01",
    description:
      "Please check the updated leave policy effective from May 2025. Changes include casual leave count and carry forward limits.",
  },
];

const Notice = () => {
  return (
    <div className="p-6 space-y-4 bg-[#1a2233]">
      <h2 className="text-2xl font-semibold text-white">Notices</h2>

      {notices.map((notice) => (
        <Card key={notice.id} className="bg-[#2c3445] text-white">
          <CardHeader>
            <CardTitle className="text-lg">{notice.title}</CardTitle>
            <p className="text-sm text-gray-400">{notice.date}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{notice.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Notice;
