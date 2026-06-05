import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

export type AuthUser = {
  name: string;
  email: string;
  photo?: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: AuthUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function loadProfile(userId: string, fallbackEmail = ""): Promise<AuthUser> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, photo_url")
    .eq("id", userId)
    .single();

  return {
    name: profile?.full_name ?? "",
    email: profile?.email ?? fallbackEmail,
    photo: profile?.photo_url ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (mounted) {
          setUser(null);
          setIsAuthReady(true);
        }
        return;
      }

      const profile = await loadProfile(session.user.id, session.user.email ?? "");
      if (mounted) {
        setUser(profile);
        setIsAuthReady(true);
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error || !data.user) return false;

    const profile = await loadProfile(data.user.id, data.user.email ?? "");
    setUser(profile);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || !password) {
      return { ok: false, error: "Name, email and password are required." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
    });

    if (error || !data.user) {
      return {
        ok: false,
        error: error?.message ?? "Could not create account.",
      };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: name.trim(),
      email: normalizedEmail,
      photo_url: null,
      phone: null,
      address: null,
      city: null,
      country: null,
      postal_code: null,
    });

    if (profileError) {
      console.log("PROFILE ERROR:", profileError);
      return {
        ok: false,
        error: profileError.message ?? "Could not create profile.",
      };
    }

    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (data: AuthUser) => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return;

    await supabase
      .from("profiles")
      .update({
        full_name: data.name,
        email: data.email,
        photo_url: data.photo ?? null,
      })
      .eq("id", authUser.id);

    setUser({
      name: data.name,
      email: data.email,
      photo: data.photo ?? null,
    });
  }, []);

  const value = useMemo(
    () => ({ user, isAuthReady, login, register, logout, updateUser }),
    [user, isAuthReady, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider is missing in main.tsx");
  return ctx;
}
