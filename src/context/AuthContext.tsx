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
  photo?: string;
};


type AuthContextType = {
  user: AuthUser | null;
  isAuthReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: AuthUser) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

useEffect(() => {
  const loadUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setUser(null);
      setIsAuthReady(true);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    setUser({
      name: profile?.full_name ?? "",
      email: profile?.email ?? session.user.email ?? "",
      photo: profile?.photo_url ?? undefined,
    });

    setIsAuthReady(true);
  };

  loadUser();
}, []);

const login = useCallback(async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return false;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  setUser({
    name: profile?.full_name ?? "",
    email: profile?.email ?? data.user.email ?? "",
    photo: profile?.photo_url ?? undefined,
  });

  return true;
}, []);

const register = useCallback(async (name: string, email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!name.trim() || !normalizedEmail || !password) {
    return false;
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
  });

  if (error || !data.user) {
  console.log("SIGNUP ERROR:", error);
  return false;
}

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      full_name: name.trim(),
      email: normalizedEmail,
    });

  if (profileError) {
  console.log("PROFILE ERROR:", profileError);
  return false;
}

  return true;
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

  setUser(data);
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
