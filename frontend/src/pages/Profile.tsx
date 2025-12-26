import ProfileHeader from "../components/profile/ProfileHeader";
import PreferencesSection from "../components/profile/PreferencesSection";
import DataPrivacySection from "../components/profile/DataPrivacySection";
import SupportSection from "../components/profile/SupportSection";
import AccountActions from "../components/profile/AccountActions";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Loading from "../components/ui/Loading";

const Profile = () => {
  const [habitCount, setHabitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabitCount = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const habitsRef = collection(db, "users", user.uid, "habits");
        const snapshot = await getDocs(habitsRef);
        setHabitCount(snapshot.size);
      } catch (error) {
        console.error("Failed to fetch habit count", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitCount();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "2rem" }}>
        <Loading message="Loading profile..." />
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <ProfileHeader habitCount={habitCount} />
      <PreferencesSection />
      <DataPrivacySection />
      <SupportSection />
      <AccountActions />
    </main>
  );
};

export default Profile;