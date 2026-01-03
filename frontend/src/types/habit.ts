import type { Timestamp } from "firebase/firestore";
import { CATEGORIES } from "../constants/categories";

export type Category = (typeof CATEGORIES)[number]["id"];

export type Habit = {
  id: string;
  title: string;
  description?: string;
  frequencyType: "daily" | "weekdays" | "weekends" | "flexible";
  targetPerPeriod?: number;
  isActive: boolean;
  createdAt: Timestamp;
  completedDates?: string[];
  category?: Category | null;
  bestStreak?: number;
  currentStreak?: number;
};
