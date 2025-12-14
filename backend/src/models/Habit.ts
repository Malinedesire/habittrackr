export type FrequencyType = 'daily' | 'weekly' | 'custom';

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  frequencyType: FrequencyType;
  targetPerPeriod: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  currentStreak?: number;
  longestStreak?: number;
  createdAt: Date;
  updatedAt?: Date;
}