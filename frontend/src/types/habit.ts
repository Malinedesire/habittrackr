import type { Timestamp } from "firebase/firestore";

export type Habit = {
  id: string;
  title: string;
  description?: string;
  frequencyType: "daily" | "weekdays" | "weekends" | "flexible";
  targetPerPeriod?: number;
  isActive: boolean;
  createdAt: Timestamp; 
  completedDates?: string[];
};