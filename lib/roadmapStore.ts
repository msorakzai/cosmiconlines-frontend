// File: src/lib/roadmapStore.ts

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  votes: number;
};

export const roadmap: RoadmapItem[] = [
  {
    id: "1",
    title: "AI-powered product suggestions",
    description: "Let sellers get AI-based recommendations for trending items.",
    status: "planned",
    votes: 12,
  },
  {
    id: "2",
    title: "Live chat with buyers",
    description: "Enable real-time messaging between sellers and buyers.",
    status: "in-progress",
    votes: 18,
  },
  {
    id: "3",
    title: "Analytics export to Excel",
    description: "Allow sellers to download performance reports as .xlsx files.",
    status: "completed",
    votes: 9,
  },
];
