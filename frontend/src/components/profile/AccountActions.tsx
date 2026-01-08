import { useState } from "react";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { CATEGORIES } from "../../constants/categories";
import "./AccountActions.css";

const AccountActions = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [focus, setFocus] = useState<string | null>(user?.focus ?? null);
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        focus,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="accountActions">
      {/* Edit toggle */}
      <button
        className="primaryAction"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? "Close" : "Edit profile"}
      </button>

      {/* Edit section */}
      {isEditing && (
        <div className="editProfile">
          {/* Name */}
          <div className="editField">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Focus */}
          <div className="editField">
            <label>Focus</label>
            <div className="categoryOptions">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`categoryChip categoryChip--${cat.color} ${
                    focus === cat.id ? "active" : ""
                  }`}
                  onClick={() => setFocus(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="editActions">
            <button
              className="primaryAction"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              className="secondaryAction"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Logout */}
      <button className="secondaryAction" onClick={handleLogout}>
        Log out
      </button>

      {/* Delete (disabled, OK för inlämning) */}
      <button className="dangerAction" disabled>
        Delete account
      </button>
    </section>
  );
};

export default AccountActions;