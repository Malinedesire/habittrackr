import ProfileHeader from "../components/profile/ProfileHeader";
import PreferencesSection from "../components/profile/PreferencesSection";
import DataPrivacySection from "../components/profile/DataPrivacySection";
import SupportSection from "../components/profile/SupportSection";
import AccountActions from "../components/profile/AccountActions";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Loading from "../components/ui/Loading";
import { getBestStreak } from "../utils/streak";
import type { Habit } from "../types/habit";

const Profile = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const habitsRef = collection(db, "users", user.uid, "habits");
        const snapshot = await getDocs(habitsRef);

        const habitsData: Habit[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Habit, "id">),
        }));

        setHabits(habitsData);
      } catch (error) {
        console.error("Failed to fetch habits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const habitCount = habits.length;

  const bestStreak = habits.reduce((max, habit) => {
    return Math.max(max, getBestStreak(habit.completedDates ?? []));
  }, 0);

  if (loading) {
    return (
      <main style={{ padding: "2rem" }}>
        <Loading message="Loading profile..." />
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <ProfileHeader habitCount={habitCount} bestStreak={bestStreak} />
      <PreferencesSection />
      <DataPrivacySection />
      <SupportSection />
      <AccountActions />
    </main>
  );
};

export default Profile;