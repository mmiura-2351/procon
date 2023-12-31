import { useEffect, useState } from "react";
import { getApps, initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "@/utils/Firebase/firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return unsubscribe;
  }, []);

  return user;
};

export default useAuth;
