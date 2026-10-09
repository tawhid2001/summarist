"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "@/firebase/firebase";
import { setUser } from "@/redux/features/authSlice";

export default function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(setUser(null));
        return;
      }

      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        const userData = userDoc.exists()
          ? userDoc.data()
          : null;

        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            subscriptionStatus:
              userData?.subscriptionStatus ?? null,
            subscriptionPlan:
              userData?.subscriptionPlan ?? null,
          })
        );
      } catch (error) {
        console.error("Failed to load user subscription:", error);

        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            subscriptionStatus: null,
            subscriptionPlan: null,
          })
        );
      }
    });

    return unsubscribe;
  }, [dispatch]);
}