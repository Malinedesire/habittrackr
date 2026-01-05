import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./ProfileHeader.css";

type Props = {
  habitCount: number;
  bestStreak: number;
};

const ProfileHeader = ({ habitCount, bestStreak }: Props) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const memberSince = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
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
            <strong>Hey there! 👋</strong>
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
