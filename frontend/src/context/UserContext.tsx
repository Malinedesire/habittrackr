import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Timestamp } from "firebase/firestore";

type UserProfile = {
  uid: string;
  name?: string;
  focus?: string;
  onboardingCompleted?: boolean;
  createdAt?: Timestamp;
};

type UserContextValue = {
  user: UserProfile | null;
  loading: boolean;
  updateUser: (data: Partial<UserProfile>) => void;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
  updateUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      const data = snap.exists()
        ? (snap.data() as Omit<UserProfile, "uid">)
        : {};

      setUser({
        uid: firebaseUser.uid,
        name: data.name,
        focus: data.focus,
        onboardingCompleted: data.onboardingCompleted,
        createdAt:
          data.createdAt ??
          Timestamp.fromDate(new Date(firebaseUser.metadata.creationTime!)),
      });

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
