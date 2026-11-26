import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    session: null,
    loading: Boolean(supabase),
    error: "",
  });

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        setAuthState({
          session: data.session,
          loading: false,
          error: error?.message || "",
        });
      })
      .catch((error) => {
        if (!active) return;
        setAuthState({
          session: null,
          loading: false,
          error: error.message,
        });
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setAuthState({ session, loading: false, error: "" });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setAuthState({ session: data.session, loading: false, error: "" });
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) throw new Error("إعداد اتصال Supabase غير مكتمل.");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setAuthState({ session: null, loading: false, error: "" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.session?.user || null,
        loading: authState.loading,
        error: authState.error,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
