import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./ProfileHeader.css";

type Props = {
  habitCount: number;
  bestStreak: number;
};

const ProfileHeader = ({ habitCount, bestStreak }: Props) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  if (loading) return null;

  const memberSince = user?.uid
    ? new Date(
        // fallback: om jag senare sparar createdAt i Firestore
        // kan använda det istället
        Date.now()
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <section className="profileSection">
      <h2>Profile</h2>

      <div className="profileCard">
        {/* Top row */}
        <div className="profileTopRow">
          <div className="avatar">👤</div>

          <div>
            <strong>
              {user?.name ? `Hey ${user.name} 👋` : "Hey there! 👋"}
            </strong>
            <div className="subText">Member since {memberSince}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="profileStats">
          <Stat label="habits" value={habitCount} />
          <Stat label="challenges" value={0} />
          <Stat
            label="best streak"
            value={bestStreak > 0 ? `${bestStreak} days` : "—"}
          />
        </div>

        {/* Edit profile */}
        <button
          className="editButton"
          onClick={() => navigate("/reset-password")}
        >
          Edit profile →
        </button>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="stat">
    <strong>{value}</strong>
    <div className="statLabel">{label}</div>
  </div>
);

export default ProfileHeader;