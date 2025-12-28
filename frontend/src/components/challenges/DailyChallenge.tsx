import { useEffect, useState } from "react";
import { fetchDailyChallenge, type Challenge } from "../../services/challenge";
import "./DailyChallenge.css";

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const data = await fetchDailyChallenge();
        setChallenge(data);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, []);

  if (loading || !challenge) return null;

  return (
    <section className="dailyChallenge">
      <span className="dailyChallenge__meta">Daily challenge</span>

      <p className="dailyChallenge__text">{challenge.description}</p>
    </section>
  );
};

export default DailyChallenge;
