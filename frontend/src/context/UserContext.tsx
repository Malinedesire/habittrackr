import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

type UserProfile = {
  uid: string;
  name?: string;
  focus?: string;
  onboardingCompleted?: boolean;
};

type UserContextValue = {
  user: UserProfile | null;
  loading: boolean;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));

      setUser({
        uid: firebaseUser.uid,
        ...(snap.exists() ? snap.data() : {}),
      });

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);