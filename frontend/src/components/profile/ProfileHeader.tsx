import { useUser } from "../../context/UserContext";
import "./ProfileHeader.css";
import { CATEGORIES } from "../../constants/categories";

type Props = {
  habitCount: number;
  bestStreak: number;
};

const ProfileHeader = ({ habitCount, bestStreak }: Props) => {
  const { user, loading } = useUser();

  if (loading || !user) return null;

  const memberSince = user.createdAt
    ? user.createdAt.toDate().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  const category = user.focus
    ? CATEGORIES.find((c) => c.id === user.focus)
    : null;

  return (
    <section className="profileHeader">
      <div className="profileHeaderCard">
        <div className="profileTopRow">
          <div className="avatar">👤</div>

          <div className="profileInfo">
            <strong className="profileGreeting">
              {user.name ? `Hey ${user.name} 👋` : "Hey there 👋"}
            </strong>

            <div className="subText">Member since {memberSince}</div>

            {category && (
              <span className={`profileBadge profileBadge--${category.color}`}>
                {category.label}
              </span>
            )}
          </div>
        </div>

        <div className="profileStats">
          <Stat label="habits" value={habitCount} />
          <Stat
            label="best streak"
            value={bestStreak > 0 ? `${bestStreak} days` : "—"}
          />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="stat">
    <strong>{value}</strong>
    <span className="statLabel">{label}</span>
  </div>
);

export default ProfileHeader;
