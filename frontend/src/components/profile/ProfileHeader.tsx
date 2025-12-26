import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  habitCount: number;
};

const ProfileHeader = ({ habitCount }: Props) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const memberSince = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>Profile</h2>

      <div
        style={{
          background: "#1f1f1f",
          borderRadius: "12px",
          padding: "1.5rem",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            👤
          </div>

          <div>
            <strong>Hey there! 👋</strong>
            <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
              Member since {memberSince}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          <Stat label="habits" value={habitCount} />
          <Stat label="challenges" value={0} />
          <Stat label="best streak" value={0} />
        </div>

        {/* Edit profile */}
        <button
          style={{ marginTop: "1.5rem", width: "100%" }}
          onClick={() => navigate("/reset-password")}
        >
          Edit profile →
        </button>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div style={{ textAlign: "center" }}>
    <strong>{value}</strong>
    <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>{label}</div>
  </div>
);

export default ProfileHeader;
