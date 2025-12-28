export type Challenge = {
  title: string;
  description: string;
  category: string;
};

export const fetchDailyChallenge = async (): Promise<Challenge> => {
  const response = await fetch("http://localhost:5000/api/challenge");

  if (!response.ok) {
    throw new Error("Failed to fetch daily challenge");
  }

  return response.json();
};