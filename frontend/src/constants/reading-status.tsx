import { ReactNode } from "react";
import { BookOpen, BookMarked, BookCheck } from "lucide-react";

export type TReadingStatus = {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
};

export const readingStatuses: TReadingStatus[] = [
  {
    id: 1,
    name: "To Read",
    description: "Keep track of books you want to read in the future.",
    icon: <BookOpen className="h-12 w-12 mb-4 text-warning" />,
  },
  {
    id: 2,
    name: "Currently Reading",
    description: "Mark books you're currently engrossed in.",
    icon: <BookMarked className="h-12 w-12 mb-4 text-primary" />,
  },
  {
    id: 3,
    name: "Read",
    description: "Celebrate the books you've completed.",
    icon: <BookCheck className="h-12 w-12 mb-4 text-success" />,
  },
];
