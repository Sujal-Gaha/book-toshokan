import { ReactNode } from "react";
import { BookMarked, BookCheck, Star } from "lucide-react";

export type TKeyFeatures = {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
};

export const keyFeatures: TKeyFeatures[] = [
  {
    id: 1,
    name: "Catalog Your Books",
    description: "Easily add and organize your book collection in one place.",
    icon: <BookMarked className="h-12 w-12 mb-4 text-primary" />,
  },
  {
    id: 2,
    name: "Track Your Progress",
    description: "Set book status: Read, To Read, or Currently Reading.",
    icon: <BookCheck className="h-12 w-12 mb-4 text-secondary" />,
  },
  {
    id: 3,
    name: "Review and Rate",
    description: "Share your thoughts and rate the books you've read.",
    icon: <Star className="h-12 w-12 mb-4 text-warning" />,
  },
];
